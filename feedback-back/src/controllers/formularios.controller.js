import { getConnection } from './../database/database';

const addFormulario = async (req, res) => {
  try {
    const { frm, qsts } = req.body;

    if (frm && qsts === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }
    const formulario = {
      name: frm.name,
      id_companie: frm.id_companie,
      autor: frm.autor,
      gmail_user: frm.gmail_user,
    };
    const connection = await getConnection();
    const insetfrm = await connection.query('INSERT INTO formularios SET ?', formulario);
    const idForm = insetfrm.insertId;
    for (let index = 0; index < qsts.length; index++) {
      qsts[index].id_form = idForm;
      const qst = qsts[index];
      const insertqst = await connection.query('INSERT INTO questions SET ?', qst);
    }
    res.json('El formulario se registro correctamente');
  } catch (error) {
    console.log(error);
  }
};
const getfomularios = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query(
      `SELECT f.*, c.name as nameCompanie 
      FROM formularios f 
      INNER JOIN companies c on c.id = f.id_companie 
      WHERE f.id_companie =${id}`
    );
    // console.log(result);
    if (result.length > 0) {
      res.json(result);
    } else {
      res.json(result);
    }
    // res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const getFormulario = async (req, res) => {
  try {
    const connection = await getConnection();
    const { idform } = req.params;
    const result = await connection.query(
      `SELECT f.*, c.name as nameCompanie FROM formularios f INNER JOIN companies c on c.id = f.id_companie WHERE f.id= ${idform}`
    );
    const type_options = await connection.query('SELECT * FROM type_options');
    res.json({ result, type_options });
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const stateformulario = async (req, res) => {
  try {
    const connection = await getConnection();
    const { state } = req.body;
    const { id } = req.params;
    if (state === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const result = await connection.query('UPDATE formularios  SET state = ? WHERE id = ?', [state, id]);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const updateform = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const { name } = req.body;

    if (name === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const form = {
      name,
    };
    const result = await connection.query(`UPDATE formularios SET ? WHERE id = ${id}`, form);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const deleteFormulario = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query('DELETE FROM formularios WHERE id = ?', id);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

export const methods = {
  addFormulario,
  getfomularios,
  getFormulario,
  stateformulario,
  updateform,
  deleteFormulario,
};
