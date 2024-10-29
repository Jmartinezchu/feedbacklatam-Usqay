import { getConnection } from '../database/database';

const getRegistersForm = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_qr, id_form } = req.params;
    const result = await connection.query(
      `SELECT COUNT(*) as total, fr.id_qr, fr.id_form FROM form_respons fr WHERE id_qr= ${id_qr} and id_form=${id_form}`
    );
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};
// no tiene Funcionalidad, ossea si pero no en el front
const getRegistersFormGeneral = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_companie } = req.params;
    const result = await connection.query(`SELECT COUNT(*) as total FROM form_respons fr WHERE id_companie =${id_companie}`);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const countResponQuestionSimple = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_qr, id_form, id_question, id_res_question } = req.params;
    const result = await connection.query(
      `SELECT COUNT(*) as total FROM respons r WHERE r.id_qr =${id_qr}  AND r.id_form =${id_form}  and r.id_question = ${id_question} and r.res_question = ${id_res_question}`
    );
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const countResponQuestionMultiple = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_qr, id_form, id_question, id_question_sub, id_res_question } = req.params;
    const result = await connection.query(
      `SELECT COUNT(*) as total FROM respons r INNER JOIN respons_sub rs on rs.id_question = rs.id_question WHERE r.id_qr =${id_qr}  AND r.id_form =${id_form}  and r.id_question = ${id_question} and rs.id_question_sub = ${id_question_sub} and rs.res_question = ${id_res_question} GROUP BY r.id`
    );
    // console.log(
    //   `SELECT COUNT(*) as total FROM respons r INNER JOIN respons_sub rs on rs.id_question = rs.id_question WHERE r.id_qr =${id_qr}  AND r.id_form =${id_form}  and r.id_question = ${id_question} and rs.id_question_sub = ${id_question_sub} and rs.res_question = ${id_res_question} GROUP BY r.id`
    // );
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const countResponQuestionNumbersGeneral = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_companie, id_res_question } = req.params;
    const result = await connection.query(
      `SELECT COUNT(*) as total FROM respons r WHERE r.tipo='numbers' AND r.id_companie =${id_companie} and r.res_question = ${id_res_question}`
    );
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

const getReportesQr = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_qr, dinicio, dfinal } = req.params;
    const dataQr = await connection.query(
      `SELECT q.id as id_qr,c.id as id_companie ,b.id as id_sucursal, f.id as id_form, b.name as nameSucursal, b.city as citySucu,f.name as nameForm 
      FROM generate_qr q 
      INNER JOIN companies c on c.id = q.id_companie 
      INNER JOIN branch_offices b on b.id = q.id_sucursal 
      INNER JOIN formularios f on f.id = q.id_form 
      WHERE q.id =${id_qr}`
    );
    // console.log(dataQr[0].id_form);

    const id_companie = dataQr[0].id_companie;
    const id_form = dataQr[0].id_form;

    const formulario = await connection.query(
      `SELECT q.id, q.titulo, q.question, q.sub_titulos, q.tipo FROM questions q WHERE q.id_form =${dataQr[0].id_form} AND q.state !=0`
    );

    const encuestados = await connection.query(
      `SELECT COUNT(*) as total FROM form_respons fr WHERE fr.id_qr= ${id_qr} and fr.id_form=${id_form} and DATE_FORMAT(fr.create_at, '%Y-%m-%d') between '${dinicio}' and '${dfinal}'`
    );

    for (let index = 0; index < formulario.length; index++) {
      if (formulario[index].tipo === 'simple') {
        let valgrafic = [
          { id: 1, count: 0 },
          { id: 2, count: 0 },
          { id: 3, count: 0 },
          { id: 4, count: 0 },
          { id: 5, count: 0 },
        ];
        const lengthvalG = valgrafic.length;
        const todoResponsS = await connection.query(
          `SELECT COUNT(*) as total, r.res_question as valor FROM respons r WHERE r.id_qr =${id_qr}  AND r.id_form =${id_form}  and r.id_question = ${formulario[index].id} and DATE_FORMAT(r.create_at, '%Y-%m-%d') between '${dinicio}' and '${dfinal}' group by r.res_question `
        );
        const lengthtodoResp = todoResponsS.length;
        for (let iv = 0; iv < lengthvalG; iv++) {
          for (let ir = 0; ir < lengthtodoResp; ir++) {
            if (valgrafic[iv].id === todoResponsS[ir].valor) {
              valgrafic[iv].count = todoResponsS[ir].total;
            }
          }
        }
        formulario[index].valgrafic = [];
        formulario[index].valgrafic.push(valgrafic);

        const sumaSfourFive = valgrafic[3].count + valgrafic[4].count;
        const sumaSTodos = sumaSfourFive + valgrafic[2].count + valgrafic[1].count + valgrafic[0].count;

        let csatQuestionS = ((sumaSfourFive / sumaSTodos) * 100).toFixed(2);

        if (csatQuestionS === null || csatQuestionS === undefined || csatQuestionS === 'NaN') {
          csatQuestionS = 0;
        }
        formulario[index].valgrafic.push({ csatQuestion: csatQuestionS });
        // console.log(todoResponsS);
      } else if (formulario[index].tipo === 'multiple') {
        const qstsub = await connection.query(
          `SELECT qs.id, qs.titulo, qs.id_question FROM questions_sub qs WHERE qs.id_question  =${formulario[index].id}`
        );
        formulario[index].sub_titulos = qstsub;
        let lengthsubT = qstsub.length;
        for (let i = 0; i < lengthsubT; i++) {
          const todoResponsM = await connection.query(
            `SELECT count(*) as total, rs.res_question as valor
            FROM respons_sub rs INNER JOIN respons r on r.id = rs.id_respon 
            where rs.id_question = ${formulario[index].id} 
            and rs.id_question_sub = ${formulario[index].sub_titulos[i].id} and r.id_qr= ${dataQr[0].id_qr}
            and r.id_companie= ${dataQr[0].id_companie} and r.id_sucursal= ${dataQr[0].id_sucursal} 
            and DATE_FORMAT(rs.create_at, '%Y-%m-%d') between '${dinicio}' and '${dfinal}' 
            GROUP by rs.res_question `
          );
          const lengthtodoResp = todoResponsM.length;
          let valgrafic = [
            { id: 1, count: 0 },
            { id: 2, count: 0 },
            { id: 3, count: 0 },
            { id: 4, count: 0 },
            { id: 5, count: 0 },
          ];
          const lengthvalG = valgrafic.length;
          for (let iv = 0; iv < lengthvalG; iv++) {
            for (let ir = 0; ir < lengthtodoResp; ir++) {
              if (valgrafic[iv].id === todoResponsM[ir].valor) {
                valgrafic[iv].count = todoResponsM[ir].total;
              }
            }
          }
          formulario[index].sub_titulos[i].valgrafic = [];
          formulario[index].sub_titulos[i].valgrafic.push(valgrafic);

          const sumaSfourFive = valgrafic[3].count + valgrafic[4].count;
          const sumaSTodos = sumaSfourFive + valgrafic[2].count + valgrafic[1].count + valgrafic[0].count;

          let csatQuestionS = ((sumaSfourFive / sumaSTodos) * 100).toFixed(2);

          if (csatQuestionS === null || csatQuestionS === undefined || csatQuestionS === 'NaN') {
            csatQuestionS = 0;
          }
          formulario[index].sub_titulos[i].valgrafic.push({ csatQuestion: csatQuestionS });
        }
      }

      if (formulario[index].tipo === 'numbers') {
        const countval1 = await connection.query(
          `SELECT COUNT(*) as total FROM respons r WHERE r.id_qr =${id_qr}  AND r.id_form =${id_form}  and r.id_question = ${formulario[index].id} and r.res_question = 1 and DATE_FORMAT(r.create_at, '%Y-%m-%d') between '${dinicio}' and '${dfinal}' `
        );
        const red = await countval1[0].total;
        // const countval2 = await connection.query(
        //   `SELECT COUNT(*) as total FROM respons r WHERE r.id_qr =${id_qr}  AND r.id_form =${id_form}  and r.id_question = ${formulario[index].id} and r.res_question = 2`
        // );
        // const yellow = await countval2[0].total;
        const countval3 = await connection.query(
          `SELECT COUNT(*) as total FROM respons r WHERE r.id_qr =${id_qr}  AND r.id_form =${id_form}  and r.id_question = ${formulario[index].id} and r.res_question = 3 and DATE_FORMAT(r.create_at, '%Y-%m-%d') between '${dinicio}' and '${dfinal}' `
        );
        const green = await countval3[0].total;

        const valred = (red / encuestados[0].total) * 100;
        // const valyellow = (yellow / encuestados[0].total) * 100;
        const valgreen = (green / encuestados[0].total) * 100;
        var calcNPS = (valgreen - valred).toFixed(2);

        if (calcNPS === null || calcNPS === undefined || calcNPS === 'NaN') {
          calcNPS = 0;
        }
      }
    }
    const respuestasSimples = await connection.query(
      `SELECT count(*) as total, r.res_question as valor FROM respons r 
      WHERE r.id_qr=${id_qr} and r.id_form= ${id_form} AND r.tipo='simple' 
      AND r.id_companie = ${id_companie} 
      and DATE_FORMAT(r.create_at, '%Y-%m-%d') between '${dinicio}' and '${dfinal}' 
      group by r.res_question`
    );
    const respuestasMultiples = await connection.query(
      `SELECT count(*) as total, rs.res_question as valor FROM respons r 
        INNER JOIN respons_sub rs on rs.id_respon = r.id 
        WHERE r.id_qr=${id_qr} and r.id_form = ${id_form} and r.tipo = 'multiple' 
        and r.id_companie= ${id_companie} 
        and DATE_FORMAT(rs.create_at, '%Y-%m-%d') between '${dinicio}' and '${dfinal}' 
        group by rs.res_question`
    );

    const anchoressimples = respuestasSimples.length;
    const anchoresmultiples = respuestasMultiples.length;
    let valoresSForm = [
      { id: 1, count: 0 },
      { id: 2, count: 0 },
      { id: 3, count: 0 },
      { id: 4, count: 0 },
      { id: 5, count: 0 },
    ];

    let valoresMForm = [
      { id: 1, count: 0 },
      { id: 2, count: 0 },
      { id: 3, count: 0 },
      { id: 4, count: 0 },
      { id: 5, count: 0 },
    ];
    var sumaTodasCount = 0;

    for (let iv = 0; iv < valoresSForm.length; iv++) {
      for (let ir = 0; ir < anchoressimples; ir++) {
        if (valoresSForm[iv].id === respuestasSimples[ir].valor) {
          valoresSForm[iv].count = respuestasSimples[ir].total;
          sumaTodasCount = sumaTodasCount + respuestasSimples[ir].total;
        }
      }
    }

    for (let iv = 0; iv < valoresMForm.length; iv++) {
      for (let ir = 0; ir < anchoresmultiples; ir++) {
        if (valoresMForm[iv].id === respuestasMultiples[ir].valor) {
          valoresMForm[iv].count = respuestasMultiples[ir].total;
          sumaTodasCount = sumaTodasCount + respuestasMultiples[ir].total;
        }
      }
    }
    const sumaFourFive = valoresSForm[3].count + valoresSForm[4].count + valoresMForm[3].count + valoresMForm[4].count;

    var calcCsat = ((sumaFourFive / sumaTodasCount) * 100).toFixed(2);
    if (calcCsat === null || calcCsat === undefined || calcCsat === 'NaN') {
      calcCsat = 0;
    }
    // console.log(valoresSForm, valoresMForm, sumaTodasCount);
    // console.log(sumaFourFive, calcCsat);

    const result = {
      dataQr,
      formulario,
      encuestados: encuestados[0].total,
      calcNPS,
      calcCsat,
    };
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const methods = {
  getReportesQr,
  getRegistersForm,
  countResponQuestionSimple,
  countResponQuestionMultiple,
  countResponQuestionNumbersGeneral,
};
