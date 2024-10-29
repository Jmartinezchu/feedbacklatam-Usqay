import { getConnection } from '../database/database';
import { DateFormat } from '../global/date-format';

const getCupones = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query(
      `SELECT cp.name as nameCompanie, s.name as nameSucursal, f.name as nameForm, cl.nombre as nameCliente, cl.celular as celCliente, 
      cg.nombre_cupon, cg.valor_cupon, DATE_FORMAT(cg.fecha_limit, '${DateFormat}') as fecha_limit, DATE_FORMAT(cg.create_at, '${DateFormat}') as create_at,
      cg.id_state_cg, cg.cupon_code, cg.fecha_reclamado, scg.valor as stateValCupon, s.address as sucuAdrress
      from cupones_ganados cg
      INNER JOIN companies cp on cp.id = cg.id_companie
      INNER JOIN branch_offices s on s.id = cg.id_sucursal
      INNER JOIN formularios f on f.id = cg.id_form
      INNER JOIN clients cl on cl.id = cg.id_client      
      INNER JOIN state_cg scg on scg.id = cg.id_state_cg
      WHERE cg.id_companie = ${id} and cg.nombre_cupon != 'Sigue intentando' ORDER BY cg.create_at DESC`
    );
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
// const getCupon = async (req, res) => {
//   try {
//     const connection = await getConnection();
//     const { idcupon } = req.params;
//     const result = await connection.query(
//       `SELECT c.id,c.nombre,c.valor, DATE_FORMAT(inicio, "%Y-%m-%d") as inicio, DATE_FORMAT(FINAL, "%Y-%m-%d") as final, c.state,c.recurrencia,c.branch_id FROM cupones c WHERE id = ${idcupon}`
//     );
//     res.json(result);
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// };
const addCupon = async (req, res) => {
  try {
    const { id_companie, id_sucursal, id_form, id_client, id_cupon, nombre_cupon, valor_cupon, fecha_limit, cupon_code } = req.body;

    if (id_companie === undefined || id_sucursal === undefined || id_client === undefined || id_cupon === undefined || fecha_limit === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const cupon = {
      id_companie,
      id_sucursal,
      id_form,
      id_client,
      id_cupon,
      nombre_cupon,
      valor_cupon,
      fecha_limit,
      cupon_code,
    };
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO cupones_ganados SET ?', cupon);
    res.json({ deploy: result, message: 'El cupon se registro correctamente' });
    // console.log(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
    // console.log(error.fatal);
  }
};
const putCodeCupon = async (req, res) => {
  try {
    const connection = await getConnection();
    const { cupon_code } = req.body;
    const { id } = req.params;
    if (cupon_code === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const result = await connection.query('UPDATE cupones_ganados  SET cupon_code = ? WHERE id = ?', [cupon_code, id]);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const stateCupon = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_state_cg, fecha_reclamado } = req.body;
    const { codeCupon } = req.params;
    if (id_state_cg === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const cupon_ganado = {
      id_state_cg,
      fecha_reclamado,
    };
    const result = await connection.query(`UPDATE cupones_ganados SET ? WHERE cupon_code = ${codeCupon}`, cupon_ganado);
    res.json({ message: 'update' });
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const stateVencidoCupon = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_state_cg } = req.body;
    const { codeCupon } = req.params;
    if (id_state_cg === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const cupon_ganado = {
      id_state_cg,
    };
    const result = await connection.query(`UPDATE cupones_ganados SET ? WHERE cupon_code = ${codeCupon}`, cupon_ganado);
    res.json({ message: 'update' });
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

export const methods = {
  getCupones,
  stateVencidoCupon,
  addCupon,
  stateCupon,
  putCodeCupon,
};
