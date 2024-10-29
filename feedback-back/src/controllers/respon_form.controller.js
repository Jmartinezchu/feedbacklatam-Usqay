import { getConnection } from './../database/database';

const addFormRespon = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_qr, id_form, id_sucursal, id_companie, questions } = req.body;
    if (id_form === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }
    const resp = {
      id_qr,
      id_form,
      id_sucursal,
      id_companie,
    };
    const arrayqsts = questions;
    const repons = await connection.query('INSERT INTO form_respons SET ?', resp);
    const reponsId = await repons.insertId;

    for (let index = 0; index < arrayqsts.length; index++) {
      if (arrayqsts[index].tipo != 'multiple') {
        const resp = {
          id_qr,
          id_form,
          id_sucursal,
          id_companie,
          id_question: arrayqsts[index].id,
          tipo: arrayqsts[index].tipo,
          res_question: arrayqsts[index].res_question,
          id_formrespon: reponsId,
        };
        await connection.query('INSERT INTO respons SET ?', resp);
      } else {
        const resp = {
          id_qr,
          id_form,
          id_sucursal,
          id_companie,
          id_question: arrayqsts[index].id,
          tipo: arrayqsts[index].tipo,
          res_question: arrayqsts[index].res_question,
          id_formrespon: reponsId,
        };
        const respMult = await connection.query('INSERT INTO respons SET ?', resp);
        var respMultId = await respMult.insertId;
        let subcategories = arrayqsts[index].sub_titulos;
        for (let index = 0; index < subcategories.length; index++) {
          const resp = {
            id_respon: respMultId,
            id_question: subcategories[index].id_question,
            id_question_sub: subcategories[index].id,
            titulo: subcategories[index].titulo,
            res_question: subcategories[index].res_question,
            id_form_respon: reponsId,
          };
          const connection = await getConnection();
          const result = await connection.query('INSERT INTO respons_sub SET ?', resp);
        }
      }
    }

    res.json({ message: ' formulario respondido se registro correctamente' });
    // console.log(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
    // console.log(error);
  }
};
// const getQuestions = async (req, res) => {
//   try {
//     const connection = await getConnection();
//     const { id } = req.params;
//     const result = await connection.query(`SELECT * FROM questions q WHERE q.id_form =${id}`);

//     res.json(result);
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// };

export const methods = {
  addFormRespon,
  //   getQuestions,
};
