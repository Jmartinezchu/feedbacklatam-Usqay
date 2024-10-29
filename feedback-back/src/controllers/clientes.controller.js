import { getConnection } from './../database/database';
import { DateFormat } from '../global/date-format';

const addCliente = async (req, res) => {
  try {
    const { doc, nombre, email, pais, celular, nacimiento, rol_id, id_companie, id_sucursal } = req.body;
    if (doc === undefined || nombre === undefined || email === undefined || pais === undefined || celular === undefined || nacimiento === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }
    const client = {
      doc,
      nombre,
      email,
      pais,
      celular,
      nacimiento,
      rol_id,
      id_companie,
      id_sucursal,
    };
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO clients SET ?', client);
    res.json({ deploy: result, message: 'El cliente se registro correctamente ' });
  } catch (error) {
    res.json({ message: 'existe' });
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const updateCliente = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const { doc, nombre, pais, ciudad, direccion, nacimiento, celular } = req.body;

    if (doc === undefined || nombre === undefined || pais === undefined || nacimiento === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }
    const client = {
      doc,
      nombre,
      pais,
      ciudad,
      direccion,
      nacimiento,
      celular,
    };
    const result = await connection.query(`UPDATE clients SET ? WHERE id = ${id}`, client);
    res.json({ message: 'update' });
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

const getcliente = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result =
      await connection.query(`SELECT cl.*,DATE_FORMAT(cl.nacimiento, '${DateFormat}') as fechaNacimiento,cl.id as idUser, r.name as nameRol, cl.state as stateCompanie, 
    c.id as idCompanie, cl.nombre as nameCompanie FROM clients cl
    INNER JOIN companies c on c.id = cl.id_companie
    INNER JOIN roles r on r.id = cl.rol_id
    WHERE cl.id=${id}`);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

const verifiCliente = async (req, res) => {
  try {
    const connection = await getConnection();
    const { celular } = req.params;
    const result = await connection.query(`SELECT * FROM clients WHERE celular =${celular}`);
    res.json(result);
    // console.log('jejejjee');
  } catch (error) {
    // res.json({ message: 'El cliente no existe ' });
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const verifiEmail = async (req, res) => {
  try {
    const connection = await getConnection();
    const { email } = req.params;
    const result = await connection.query(`SELECT * FROM clients WHERE email ='${email}'`);
    res.json(result);
  } catch (error) {
    // res.json({ message: 'El cliente no existe ' });
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const getclientesCount = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_companie } = req.params;
    const result = await connection.query(`SELECT COUNT(*) as total FROM clients c WHERE c.id_companie = ${id_companie}`);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const getlistclientsCompanie = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_companie } = req.params;
    const result = await connection.query(
      `SELECT c.*,DATE_FORMAT(c.nacimiento, '${DateFormat}') as fechaNacimiento, DATE_FORMAT(c.create_up, '${DateFormat}') as create_up, b.name as nameSucu FROM clients c inner JOIN branch_offices b on b.id= c.id_sucursal WHERE c.id_companie =  ${id_companie} ORDER BY c.create_up DESC`
    );
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
export const methods = {
  addCliente,
  verifiCliente,
  verifiEmail,
  getclientesCount,
  getlistclientsCompanie,
  updateCliente,
  getcliente,
};
