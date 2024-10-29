import { getConnection } from './../database/database';

const addrespons_sub = async (req, res) => {
  try {
    const { id_respon, id_question, id_question_sub, titulo, res_question, id_form_respon } = req.body;

    if (id_respon === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const resp = {
      id_respon,
      id_question,
      id_question_sub,
      titulo,
      res_question,
      id_form_respon,
    };
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO respons_sub SET ?', resp);
    res.json({ deploy: result, message: 'la respuesta_sub se registro correctamente' });
    console.log(result);
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
  addrespons_sub,
  //   getQuestions,
};
