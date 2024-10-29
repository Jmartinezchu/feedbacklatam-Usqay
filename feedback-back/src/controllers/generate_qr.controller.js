import { getConnection } from '../database/database';

const addQr = async (req, res) => {
  try {
    const { autor, gmail, id_companie, id_sucursal, id_form } = req.body;

    if (autor === undefined || id_sucursal === undefined || id_form === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const qr = {
      autor,
      gmail,
      id_companie,
      id_sucursal,
      id_form,
    };
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO generate_qr SET ?', qr);
    res.json({ message: 'El qr a sido generado ' });
    // console.log(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
    // console.log(error.fatal);
  }
};
const getQrs = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query(
      `SELECT q.*, c.name as nameCompanie, b.name as nameSucursal, b.city as citySucu, b.address as addressSucu, f.name as nameForm 
      FROM generate_qr q 
      INNER JOIN companies c on c.id = q.id_companie 
      INNER JOIN branch_offices b on b.id = q.id_sucursal 
      INNER JOIN formularios f on f.id = q.id_form 
      WHERE q.id_companie =${id}`
    );

    res.json(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const getQr = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query(
      `SELECT q.*, c.name as nameCompanie, b.name as nameSucursal, b.city as citySucu, b.address as addressSucu, f.name as nameForm, i.filename 
      FROM generate_qr q 
      INNER JOIN companies c on c.id = q.id_companie 
      INNER JOIN images i on i.id = c.logo 
      INNER JOIN branch_offices b on b.id = q.id_sucursal 
      INNER JOIN formularios f on f.id = q.id_form 
      WHERE q.id =${id}`
    );

    res.json(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const stateQr = async (req, res) => {
  try {
    const connection = await getConnection();
    const { state } = req.body;
    const { id } = req.params;
    if (state === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const result = await connection.query('UPDATE generate_qr  SET state = ? WHERE id = ?', [state, id]);
    res.json(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
// const updateform = async (req, res) => {
//   try {
//     const connection = await getConnection();
//     const { id } = req.params;
//     const { name } = req.body;

//     if (name === undefined) {
//       res.status(400).json({ message: 'Por favor, completar todos los campos.' });
//     }

//     const form = {
//       name,
//     };
//     const result = await connection.query(`UPDATE formularios SET ? WHERE id = ${id}`, form);
//     res.json(result);
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// };
const deleteQr = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query('DELETE FROM generate_qr WHERE id = ?', id);
    res.json(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

export const methods = {
  addQr,
  getQrs,
  stateQr,
  deleteQr,
  getQr,
};
