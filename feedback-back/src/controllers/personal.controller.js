import { getConnection } from './../database/database';

const addPersonal = async (req, res) => {
  try {
    const { dni, name, celular, usuario, password, rol, compani_id } = req.body;

    if (
      dni === undefined ||
      name === undefined ||
      celular === undefined ||
      usuario === undefined ||
      password === undefined ||
      rol === undefined ||
      compani_id === undefined
    ) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const person = {
      dni,
      name,
      celular,
      usuario,
      password,
      rol,
      compani_id,
    };
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO personal SET ?', person);
    res.json({ deploy: result, message: 'El personal se registro correctamente ' });
    // console.log(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
    // console.log(error.fatal);
  }
};
const getPersonals = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query(`SELECT p.* FROM personal p INNER JOIN companies c on c.id = p.compani_id WHERE p.compani_id = ${id}`);
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
const getPersonal = async (req, res) => {
  try {
    const connection = await getConnection();
    const { idperson } = req.params;
    const result = await connection.query(`SELECT p.* FROM personal p WHERE p.id= ${idperson}`);
    res.json(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const statePersonal = async (req, res) => {
  try {
    const connection = await getConnection();
    const { state } = req.body;
    const { id } = req.params;
    if (state === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const result = await connection.query('UPDATE personal  SET state = ? WHERE id = ?', [state, id]);
    res.json(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const updatePersonal = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const { celular, usuario, password, rol } = req.body;

    if (celular === undefined || usuario === undefined || password === undefined || rol === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const person = {
      celular,
      usuario,
      password,
      rol,
    };
    const result = await connection.query(`UPDATE personal SET ? WHERE id = ${id}`, person);
    res.json(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const deletePersonal = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query('DELETE FROM personal WHERE id = ?', id);
    res.json(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

export const methods = {
  addPersonal,
  getPersonals,
  getPersonal,
  statePersonal,
  updatePersonal,
  deletePersonal,
};
