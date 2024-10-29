import { getConnection } from '../database/database';
import { DateFormat, DateFormatcupon } from '../global/date-format';
const getHome = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_companie } = req.params;

    // TODO: listas de ARRAYS de compañias registradas
    const qrs = await connection.query(
      `SELECT q.*, c.name as nameCompanie, b.name as nameSucursal, b.city as citySucu, b.address as addressSucu, f.name as nameForm 
      FROM generate_qr q 
      INNER JOIN companies c on c.id = q.id_companie 
      INNER JOIN branch_offices b on b.id = q.id_sucursal 
      INNER JOIN formularios f on f.id = q.id_form 
      WHERE q.id_companie =${id_companie}`
    );
    const personal = await connection.query(
      `SELECT p.* FROM personal p INNER JOIN companies c on c.id = p.compani_id WHERE p.compani_id = ${id_companie}`
    );
    const formularios = await connection.query(
      `SELECT f.*, c.name as nameCompanie 
        FROM formularios f 
        INNER JOIN companies c on c.id = f.id_companie 
        WHERE f.id_companie =${id_companie}`
    );
    const lengthForms = formularios.length;
    for (let index = 0; index < lengthForms; index++) {
      const qsts = await connection.query(`SELECT * FROM questions q WHERE q.id_form =${formularios[index].id}`);
      const lengthqsts = qsts.length;
      for (let i = 0; i < lengthqsts; i++) {
        if (qsts[i].tipo === 'multiple') {
          const qstsub = await connection.query(`SELECT * FROM questions_sub qs WHERE qs.id_question  =${qsts[i].id}`);
          qsts[i].sub_titulos = qstsub;
        }
      }
      formularios[index].questions = [];
      formularios[index].questions.push(qsts);
    }
    const sucursales = await connection.query(
      `SELECT b.* FROM branch_offices b INNER JOIN companies c on c.id = b.id_companie WHERE id_companie = ${id_companie}`
    );
    const lengthSucu = sucursales.length;
    for (let index = 0; index < lengthSucu; index++) {
      let idRegisterLink = sucursales[index].id;

      const typeComent = [
        { valor: 'Felicitaciones', count: 0, list: [] },
        { valor: 'Sugerencias', count: 0, list: [] },
        { valor: 'Reclamos', count: 0, list: [] },
      ];
      for (let j = 0; j < 3; j++) {
        const valorTotal = await connection.query(
          `SELECT COUNT(*) as total FROM comentarios c INNER JOIN type_coments tc on tc.id = c.id_typeComent WHERE c.id_sucursal = ${idRegisterLink} and tc.valor ='${typeComent[j].valor}'`
        );
        const list = await connection.query(
          `SELECT cm.id,cm.id_sucursal, cm.comentario,  DATE_FORMAT(cm.create_at, '${DateFormat}') as fecha_up ,tc.valor , cl.nombre, cl.celular, cl.email
          FROM comentarios cm 
          INNER JOIN clients cl on cl.id = cm.id_client 
          INNER JOIN type_coments tc on tc.id = cm.id_typeComent 
          WHERE cm.id_sucursal=${idRegisterLink} AND tc.valor='${typeComent[j].valor}' ORDER BY cm.id DESC` // fecha_up por id
        );
        typeComent[j].count = valorTotal[0].total;
        typeComent[j].list = list;
      }
      sucursales[index].valgrafic = [];
      sucursales[index].valgrafic.push(typeComent);
      const listCupones = await connection.query(
        `SELECT c.*, DATE_FORMAT(inicio, '${DateFormatcupon}') as inicio, DATE_FORMAT(FINAL, '${DateFormatcupon}') as final FROM cupones c INNER JOIN branch_offices b on b.id = c.branch_id WHERE c.branch_id = ${idRegisterLink}`
      );
      if (listCupones.length != 0) {
        let lengthCupones = listCupones.length;
        const fechahoyc = new Date();
        for (let index = 0; index < lengthCupones; index++) {
          let dateInicio = new Date(listCupones[index].inicio);
          let dateFinal = new Date(listCupones[index].final);
          dateFinal.setDate(dateFinal.getDate() + 1);

          let inicionum = dateInicio.getTime();
          let finalnum = dateFinal.getTime();

          if (listCupones[index].stock === 0 && listCupones[index].state === 1) {
            await connection.query(`UPDATE cupones  SET state = 0 WHERE id = ${listCupones[index].id}`);
          }
          if (fechahoyc.getTime() >= inicionum && fechahoyc.getTime() <= finalnum) {
          } else {
            await connection.query(`UPDATE cupones  SET state = 0 WHERE id = ${listCupones[index].id}`);
          }
        }
      }
      if (listCupones.length != 0) {
        sucursales[index].cupones = [];
        sucursales[index].cupones.push(listCupones);
      }
    }
    const recurrencias = await connection.query('SELECT * FROM recurrencia_cupones');
    const roles = await connection.query('SELECT * FROM roles');
    const type_optionsForms = await connection.query('SELECT * FROM type_options');
    const multilinks = await connection.query(
      `SELECT r.*, b.name as sucursal, b.city, b.address
      FROM registerlinks r
      INNER JOIN companies c on c.id = r.id_companie 
      INNER JOIN branch_offices b on b.id = r.id_sucursal 
      WHERE r.id_companie =${id_companie}`
    );
    const listQRLenghth = multilinks.length;
    for (let index = 0; index < listQRLenghth; index++) {
      let idRegisterLink = multilinks[index].id;
      const listLinks = await connection.query(
        `SELECT *
        FROM data_links 
        WHERE id_register_links = ${idRegisterLink}`
      );
      if (listLinks.length != 0) {
        multilinks[index].qr_linksdata = listLinks;
      }
    }
    const clientes_registrados = await connection.query(
      `SELECT c.*,DATE_FORMAT(c.nacimiento, '${DateFormat}') as fechaNacimiento, DATE_FORMAT(c.create_up, '${DateFormat}') as create_up, b.name as nameSucu FROM clients c inner JOIN branch_offices b on b.id= c.id_sucursal WHERE c.id_companie =  ${id_companie} ORDER BY c.id DESC` //c.create_up por id
    );
    const cupones_ganados = await connection.query(
      `SELECT cp.name as nameCompanie, s.name as nameSucursal, f.name as nameForm, cl.nombre as nameCliente, cl.celular as celCliente, 
      cg.nombre_cupon, cg.valor_cupon, DATE_FORMAT(cg.fecha_limit, '${DateFormat}') as fecha_limit, DATE_FORMAT(cg.create_at, '${DateFormat}') as create_at,
      cg.id_state_cg, cg.cupon_code, cg.fecha_reclamado, scg.valor as stateValCupon, s.address as sucuAdrress
      from cupones_ganados cg
      INNER JOIN companies cp on cp.id = cg.id_companie
      INNER JOIN branch_offices s on s.id = cg.id_sucursal
      INNER JOIN formularios f on f.id = cg.id_form
      INNER JOIN clients cl on cl.id = cg.id_client      
      INNER JOIN state_cg scg on scg.id = cg.id_state_cg
      WHERE cg.id_companie = ${id_companie} and cg.nombre_cupon != 'Sigue intentando' ORDER BY cg.id DESC` //cg.create_at por id
    );
    if (cupones_ganados.length != 0) {
      // let arr = cupones_ganados;
      const lengtharr = cupones_ganados.length;
      let valcount = 0;
      const fechahoy = new Date();
      for (var inicioarr = 0; inicioarr < lengtharr; inicioarr++) {
        valcount++;
        let dateFinal = new Date(cupones_ganados[inicioarr].fecha_limit);
        dateFinal.setDate(dateFinal.getDate() + 2);
        let finalnum = dateFinal.getTime();
        if (fechahoy.getTime() >= finalnum && cupones_ganados[inicioarr].id_state_cg === 1) {
          await connection.query(`UPDATE cupones_ganados SET id_state_cg=3 WHERE cupon_code = ${cupones_ganados[inicioarr].cupon_code}`);
        }
      }
    }
    // TODO: Valores contables
    const allClienteRegister = await connection.query(`SELECT COUNT(*) as total FROM clients c WHERE c.id_companie = ${id_companie}`);
    const allCuponesCompanie = await connection.query(`SELECT COUNT(*) as total FROM cupones c where c.id_companie= ${id_companie}`);
    const allEncuestadosCompanie = await connection.query(`SELECT COUNT(*) as total FROM form_respons c WHERE c.id_companie = ${id_companie}`);
    const allComentsCompanie = await connection.query(`SELECT COUNT(*) as total FROM comentarios c WHERE c.id_companie =${id_companie}`);

    // TODO:Asigancion del valor NPS
    const countval1 = await connection.query(
      `SELECT COUNT(*) as total FROM respons r WHERE r.tipo='numbers' AND r.id_companie =${id_companie} and r.res_question = 1`
    );
    // const countval2 = await connection.query(
    //   `SELECT COUNT(*) as total FROM respons r WHERE r.tipo='numbers' AND r.id_companie =${id_companie} and r.res_question = 2`
    // );
    const countval3 = await connection.query(
      `SELECT COUNT(*) as total FROM respons r WHERE r.tipo='numbers' AND r.id_companie =${id_companie} and r.res_question = 3`
    );
    const colorred = countval1[0].total;
    // const coloryellow = countval2[0].total;
    const colorgreen = countval3[0].total;
    // Obtencion de numeros
    const valred = ((colorred / allEncuestadosCompanie[0].total) * 100).toFixed(2);
    // const valyellow = ((coloryellow / allEncuestadosCompanie[0].total) * 100).toFixed(2);
    const valgreen = ((colorgreen / allEncuestadosCompanie[0].total) * 100).toFixed(2);

    const valorNPS = (valgreen - valred).toFixed(2);

    // TODO: Datos para la gracicos en home
    const coments1 = await connection.query(
      `SELECT COUNT(*) as total FROM comentarios c WHERE c.id_companie = ${id_companie}  and c.id_typeComent =1`
    );
    const coments2 = await connection.query(
      `SELECT COUNT(*) as total FROM comentarios c WHERE c.id_companie = ${id_companie}  and c.id_typeComent =2`
    );
    const coments3 = await connection.query(
      `SELECT COUNT(*) as total FROM comentarios c WHERE c.id_companie = ${id_companie}  and c.id_typeComent =3`
    );
    const countFeli = coments1[0].total;
    const countSuge = coments2[0].total;
    const countRecla = coments3[0].total;

    const datahome = {
      lists: {
        sucursales,
        qrs,
        personal,
        formularios,
        multilinks,
        cupones_ganados,
        clientes_registrados,
        recurrencias,
        roles,
        type_optionsForms,
      },
      cards: {
        lengthQrs: qrs.length,
        lengthPersonal: personal.length,
        lengthFormularios: formularios.length,
        lengthSucursales: sucursales.length,
        lengthmultilink: multilinks.length,
        allClienteRegister: allClienteRegister[0].total,
        allCuponesCompanie: allCuponesCompanie[0].total,
        allEncuestadosCompanie: allEncuestadosCompanie[0].total,
        allComentsCompanie: allComentsCompanie[0].total,
        valorNPS,
      },
      valGraficos: {
        countFeli,
        countSuge,
        countRecla,
      },
    };

    res.json(datahome);
    // console.log(datahome.lists.cupones_ganados);
  } catch (error) {
    console.log(error);
  }
};
const getcoments = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_companie } = req.params;

    const sucursales = await connection.query(
      `SELECT b.* FROM branch_offices b INNER JOIN companies c on c.id = b.id_companie WHERE id_companie = ${id_companie}`
    );
    for (let i = 0; i < sucursales.length; i++) {
      const typeComent = [
        { valor: 'Felicitaciones', count: 0, list: [] },
        { valor: 'Sugerencias', count: 0, list: [] },
        { valor: 'Reclamos', count: 0, list: [] },
      ];
      for (let j = 0; j < 3; j++) {
        const valorTotal = await connection.query(
          `SELECT COUNT(*) as total FROM comentarios c INNER JOIN type_coments tc on tc.id = c.id_typeComent WHERE c.id_sucursal = ${sucursales[i].id} and tc.valor ='${typeComent[j].valor}'`
        );
        const list = await connection.query(
          `SELECT cm.id,cm.id_sucursal, cm.comentario,  DATE_FORMAT(cm.create_at, '${DateFormat}') as fecha_up ,tc.valor , cl.nombre, cl.celular, cl.email
          FROM comentarios cm 
          INNER JOIN clients cl on cl.id = cm.id_client 
          INNER JOIN type_coments tc on tc.id = cm.id_typeComent 
          WHERE cm.id_sucursal=${sucursales[i].id} AND tc.valor='${typeComent[j].valor}' ORDER BY cm.id DESC`
        );
        typeComent[j].count = valorTotal[0].total;
        typeComent[j].list = list;
      }
      sucursales[i].valgrafic = [];
      sucursales[i].valgrafic.push(typeComent);
    }

    res.json(sucursales);
  } catch (error) {
    console.log(error);
  }
};

const getlogosClientes = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      `SELECT c.name, i.filename FROM companies c INNER JOIN images i on i.id = c.logo where c.id != 23 ORDER BY c.id DESC
      LIMIT 10;`
    );
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
export const methods = {
  getHome,
  getcoments,
  getlogosClientes,
};
