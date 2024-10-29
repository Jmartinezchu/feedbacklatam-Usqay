import { getConnection } from '../database/database';

const addTypeCompanie = async (req, res) => {
  try {
    const { name } = req.body;

    if (name === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const type = {
      name,
    };
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO type_companie SET ?', type);
    res.json({ message: 'El qr a sido generado ' });
    // console.log(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
    // console.log(error.message);
  }
};
const getTypes = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(`SELECT * FROM type_companie`);

    res.json(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const getType = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query(`SELECT * FROM type_companie where id= ${id}`);

    res.json(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

const deleteType = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query('DELETE FROM type_companie WHERE id = ?', id);
    res.json(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

export const methods = {
  addTypeCompanie,
  getTypes,
  deleteType,
  getType,
};
