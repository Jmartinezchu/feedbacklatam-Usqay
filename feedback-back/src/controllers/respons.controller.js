import { getConnection } from './../database/database';

const addrespons = async (req, res) => {
  try {
    const { id_qr, id_form, id_sucursal, id_companie, id_question, tipo, res_question, id_formrespon } = req.body;

    if (id_form === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const resp = {
      id_qr,
      id_form,
      id_sucursal,
      id_companie,
      id_question,
      tipo,
      res_question,
      id_formrespon,
    };
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO respons SET ?', resp);
    res.json({ deploy: result, message: 'la respuesta se registro correctamente' });
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
  addrespons,
  //   getQuestions,
};
