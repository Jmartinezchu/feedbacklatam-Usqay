import { getConnection } from './../database/database';

const countCsatFormSimple = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_form, id_companie, id_res_question } = req.params;
    const result = await connection.query(
      `SELECT COUNT(*) as total FROM respons r WHERE r.id_form= ${id_form} AND r.tipo='simple' AND r.id_companie = ${id_companie} AND r.res_question = ${id_res_question}`
    );
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const countCsatFormMultiple = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_form, id_companie, id_res_question } = req.params;
    const result = await connection.query(
      `SELECT COUNT(*) as total FROM respons r 
        INNER JOIN respons_sub rs on rs.id_respon = r.id 
        WHERE r.tipo = 'multiple' and r.id_companie= ${id_companie} and r.id_form = ${id_form} and rs.res_question =  ${id_res_question}`
    );
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

export const methods = {
  countCsatFormSimple,
  countCsatFormMultiple,
};
