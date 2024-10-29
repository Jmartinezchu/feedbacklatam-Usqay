import { getConnection } from './../database/database';

const addQuestionSub = async (req, res) => {
  try {
    const { titulo, icon, id_question } = req.body;

    if (titulo === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const qst = {
      titulo,
      icon,
      id_question,
    };
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO questions_sub SET ?', qst);
    res.json({ deploy: result, message: 'el Sub titulo agregado correctamente ' });
    // console.log(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
    // console.log(error);
  }
};
const getQuestionsSub = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query(`SELECT * FROM questions_sub qs WHERE qs.id_question  =${id}`);

    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const deletesubtituloquestion = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query('DELETE FROM questions_sub WHERE id = ?', id);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
export const methods = {
  addQuestionSub,
  getQuestionsSub,
  deletesubtituloquestion,
};
