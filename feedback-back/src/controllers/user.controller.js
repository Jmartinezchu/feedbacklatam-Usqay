import { getConnection } from './../database/database';

const getUsers = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM users');
    // console.log(result)
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

const getUser = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query('SELECT * FROM users WHERE id = ?', id);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email, password, token, compani_id, rol_id } = req.body;

    if (
      name === undefined ||
      email === undefined ||
      password === undefined ||
      token === undefined ||
      compani_id === undefined ||
      rol_id === undefined
    ) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const users = {
      name,
      email,
      password,
      token,
      compani_id,
      rol_id,
    };
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO users SET ?', users);
    res.json({ message: 'El usuario se registro correctamente ' });
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const connection = await getConnection();
    const { name, email, token } = req.body;
    const { id } = req.params;
    if (name === undefined || email === undefined || token === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const result = await connection.query('UPDATE users SET name = ?, email = ?, token = ? WHERE id = ?', [name, email, token, id]);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query('DELETE FROM users WHERE id = ?', id);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

export const methods = {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  addUser,
};
