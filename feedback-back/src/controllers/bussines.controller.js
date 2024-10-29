import { getConnection } from '../database/database';
import { DateFormat } from '../global/date-format';

const getCompanies = async (req, res) => {
  try {
    const connection = await getConnection();
    const sql = `SELECT c.*, DATE_FORMAT(c.created_at, '${DateFormat}') as iniOperaciones, i.id as id_logo, i.nombre as nameImage, i.filename FROM companies c INNER JOIN images i on i.id = c.logo`;

    const result = await connection.query(sql);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
    // console.log(error.message);
  }
};
const filterTypecompanie = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query(
      `SELECT c.*,DATE_FORMAT(c.created_at, '${DateFormat}') as iniOperaciones, i.filename FROM companies c INNER JOIN images i on i.id = c.logo WHERE type_companie = ?`,
      id
    );
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
    // console.log(error.message);
  }
};
const ultimaRespons = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query(
      'SELECT DATE_FORMAT(create_at, "%d-%m-%Y") as iniOperaciones FROM form_respons where id_companie= ? ORDER by ID DESC limit 1',
      id
    );
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const getCompanie = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query(
      `SELECT c.*,DATE_FORMAT(c.created_at, '${DateFormat}') as iniOperaciones, i.id as id_logo, i.nombre as nameImage, i.filename  FROM companies c INNER JOIN images i on i.id = c.logo WHERE c.id = ${id} `
    );
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
    // console.log(error.message);
  }
};
const addCompanie = async (req, res) => {
  try {
    const { name, description, city, state, type_companie, typesfoodid, logo, ruc, razon_social, telefono, email, direccion } = req.body;

    if (
      name === undefined ||
      description === undefined ||
      city === undefined ||
      state === undefined ||
      typesfoodid === undefined ||
      logo === undefined
    ) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const companies = {
      name,
      description,
      city,
      state,
      type_companie,
      typesfoodid,
      logo,
      ruc,
      razon_social,
      telefono,
      email,
      direccion,
    };
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO companies SET ?', companies);
    res.json({ deploy: result, message: 'La compañia se registro correctamente ' });
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
    // console.log(error.message);
  }
};
const stateCompanie = async (req, res) => {
  try {
    const connection = await getConnection();
    const { state } = req.body;
    const { id } = req.params;
    if (state === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const result = await connection.query('UPDATE companies  SET state = ? WHERE id = ?', [state, id]);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
    // console.log(error.message);
  }
};
const updateCompanie = async (req, res) => {
  try {
    const connection = await getConnection();
    const { name, description, city, state, type_companie, typesfoodid, logo, ruc, razon_social, telefono, email, direccion, gmail_notifications } =
      req.body;
    const { id } = req.params;

    if (name === undefined || description === undefined || city === undefined || typesfoodid === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const companies = {
      name,
      description,
      city,
      state,
      type_companie,
      typesfoodid,
      logo,
      ruc,
      razon_social,
      telefono,
      email,
      direccion,
      gmail_notifications,
    };
    const result = await connection.query(`UPDATE companies SET ? WHERE id = ${id}`, companies);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
    // console.log(error.message);
  }
};
const getEncuestadosCount = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_companie } = req.params;
    const result = await connection.query(`SELECT COUNT(*) as total FROM form_respons c WHERE c.id_companie = ${id_companie}`);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
    // console.log(error.message);
  }
};
const deleteCompanie = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query('DELETE FROM companies WHERE id = ?', id);
    res.json('se Elimino la compañia');
    // deleteUser();
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
    // console.log(error.message);
  }
};
const deleteUser = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query('DELETE FROM users WHERE compani_id = ?', id);
    res.json('se Elimino el Usauario de esta comapañia');
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error.message);
  }
};

export const methods = {
  getCompanies,
  getCompanie,
  addCompanie,
  deleteCompanie,
  deleteUser,
  stateCompanie,
  updateCompanie,
  getEncuestadosCount,
  filterTypecompanie,
  ultimaRespons,
  // uploadArchive,
};
