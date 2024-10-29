import { getConnection } from './../database/database';

const addQuestion = async (req, res) => {
  try {
    const { titulo, question, icon, val, tipo, id_form } = req.body;

    if (question === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const qst = {
      titulo,
      question,
      icon,
      val,
      tipo,
      id_form,
    };
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO questions SET ?', qst);
    res.json({ deploy: result, message: 'la pregunta se registro correctamente' });
    // console.log(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
    // console.log(error);
  }
};
const getQuestions = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query(`SELECT * FROM questions q WHERE q.id_form =${id} AND q.state !=0`);
    const opts = await connection.query(`SELECT * FROM options`);
    for (let index = 0; index < result.length; index++) {
      if (result[index].tipo === 'booleam') {
        result[index].res_question = null;
      } else if (result[index].tipo === 'numbers') {
        result[index].res_question = null;
      } else if (result[index].tipo === 'simple') {
        result[index].options = opts;
        result[index].res_question = null;
      } else if (result[index].tipo === 'multiple') {
        result[index].res_question = null;
        const qstsub = await connection.query(`SELECT * FROM questions_sub qs WHERE qs.id_question  =${result[index].id}`);

        for (let ind = 0; ind < qstsub.length; ind++) {
          qstsub[ind].options = opts;
          // if (qstsub[ind].type_options != 1) {
          qstsub[ind].res_question = null;
          // }
        }
        result[index].sub_titulos = qstsub;
      }
    }
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const getQuestionsAdmin = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query(`SELECT * FROM questions q WHERE q.id_form =${id}`);
    const opts = await connection.query(`SELECT * FROM options`);
    for (let index = 0; index < result.length; index++) {
      if (result[index].tipo === 'simple') {
        result[index].options = opts;
      } else if (result[index].tipo === 'multiple') {
        const qstsub = await connection.query(`SELECT * FROM questions_sub qs WHERE qs.id_question  =${result[index].id}`);
        for (let ind = 0; ind < qstsub.length; ind++) {
          qstsub[ind].options = opts;
        }
        result[index].sub_titulos = qstsub;
      }
    }
    // console.log(result);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const getOptions = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(`SELECT * FROM options`);

    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

const stateQuestion = async (req, res) => {
  try {
    const connection = await getConnection();
    const { state } = req.body;
    const { id } = req.params;
    if (state === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const result = await connection.query('UPDATE questions  SET state = ? WHERE id = ?', [state, id]);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const deleteQuestion = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query('DELETE FROM questions WHERE id = ?', id);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const getQuestion = async (req, res) => {
  try {
    const connection = await getConnection();
    const { idform, id, tipo } = req.params;
    if (tipo === 'simple') {
      const result = await connection.query(`SELECT * FROM questions WHERE tipo = 'simple' and id_form = ${idform} and id =  ${id}`);
      res.json(result);
    } else {
      const result = await connection.query(`SELECT * FROM questions WHERE tipo = 'multiple' and id_form = ${idform} and id =  ${id}`);
      const areas = await connection.query(`SELECT * FROM questions_sub qs WHERE qs.id_question  =${id}`);
      for (let index = 0; index < areas.length; index++) {
        areas[index].icon = String.fromCodePoint('0x' + areas[index].icon);
      }
      result[0].sub_titulos = areas;
      res.json(result);
    }
    // res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

const updateQuestion = async (req, res) => {
  try {
    const connection = await getConnection();
    const { idform, id, tipo } = req.params;

    if (tipo === 'simple') {
      const { titulo, question, icon } = req.body;
      const qst = {
        titulo,
        question,
        icon,
      };
      const result = await connection.query(`UPDATE questions SET ? WHERE tipo = '${tipo}' and id_form = ${idform} and id =  ${id}`, qst);
      res.json('Actualizado!!');
    } else if (tipo === 'multiple') {
      const { titulo, question, sub_titulos } = req.body;
      const qst = {
        titulo,
        question,
      };
      const qstsub = {
        sub_titulos,
      };
      const subcategories = qstsub.sub_titulos;
      // console.log(qstsub.sub_titulos);
      const result = await connection.query(`UPDATE questions SET ? WHERE tipo = '${tipo}' and id_form = ${idform} and id =  ${id}`, qst);
      for (let index = 0; index < subcategories.length; index++) {
        if (subcategories[index].id === undefined) {
          const qstnew = {
            titulo: subcategories[index].titulo,
            icon: subcategories[index].icon.codePointAt(0).toString(16),
            id_question: subcategories[index].id_question,
          };
          const result = await connection.query('INSERT INTO questions_sub SET ?', qstnew);

          // console.log('nuevo registro');
        } else {
          const subtitle = {
            titulo: subcategories[index].titulo,
            icon: subcategories[index].icon.codePointAt(0).toString(16),
          };
          const result = await connection.query(`UPDATE questions_sub SET ? WHERE id =  ${subcategories[index].id}`, subtitle);
          // console.log('se actualiza');
        }
      }
      // console.log('actualizado todo');
      res.json('Actualizado!!');
    }
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

export const methods = {
  getOptions,
  addQuestion,
  getQuestions,
  getQuestionsAdmin,
  stateQuestion,
  deleteQuestion,
  getQuestion,
  updateQuestion,
};
