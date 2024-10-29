import { getConnection } from './../database/database';
import { DateFormat, DateFormatcupon } from '../global/date-format';

const getCuponesCount = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_companie } = req.params;
    const result = await connection.query(`SELECT COUNT(*) as total FROM cupones c where c.id_companie= ${id_companie}`);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const getCupones = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query(
      `SELECT c.*, DATE_FORMAT(inicio, '${DateFormatcupon}') as inicio, DATE_FORMAT(FINAL, '${DateFormatcupon}') as final FROM cupones c INNER JOIN branch_offices b on b.id = c.branch_id WHERE c.branch_id = ${id}`
    );
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const getCuponesRuleta = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query(
      `SELECT c.*, DATE_FORMAT(inicio, '${DateFormat}') as inicio, DATE_FORMAT(FINAL, '${DateFormat}') as final FROM cupones c INNER JOIN branch_offices b on b.id = c.branch_id WHERE c.branch_id = ${id} and c.stock != 0 and c.state != 0`
    );
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const getCupon = async (req, res) => {
  try {
    const connection = await getConnection();
    const { idcupon } = req.params;
    const result = await connection.query(
      `SELECT c.*, DATE_FORMAT(inicio, '${DateFormatcupon}') as inicio, DATE_FORMAT(FINAL, '${DateFormatcupon}') as final FROM cupones c WHERE id = ${idcupon}`
    );
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const addCupon = async (req, res) => {
  try {
    const { nombre, valor, stock, inicio, final, state, recurrencia, branch_id, id_companie } = req.body;

    if (
      nombre === undefined ||
      valor === undefined ||
      stock === undefined ||
      inicio === undefined ||
      final === undefined ||
      state === undefined ||
      recurrencia === undefined ||
      branch_id === undefined
    ) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const cupon = {
      nombre,
      valor,
      stock,
      inicio,
      final,
      state,
      recurrencia,
      branch_id,
      id_companie,
    };
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO cupones SET ?', cupon);
    res.json({ deploy: result, message: 'El cupon se registro correctamente ' });
    // console.log(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
    // console.log(error.message);
  }
};
const updateCupon = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const { nombre, valor, stock, final, recurrencia } = req.body;

    if (nombre === undefined || valor === undefined || final === undefined || recurrencia === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const cupon = {
      nombre,
      valor,
      stock,
      final,
      recurrencia,
    };
    const result = await connection.query(`UPDATE cupones SET ? WHERE id = ${id}`, cupon);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

const stockCupon = async (req, res) => {
  try {
    const connection = await getConnection();
    const { stock, state } = req.body;
    const cupon = {
      stock,
      state,
    };
    const { id } = req.params;
    if (stock === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }
    const result = await connection.query(`UPDATE cupones  SET ? WHERE id = ${id}`, cupon);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const stateCupon = async (req, res) => {
  try {
    const connection = await getConnection();
    const { state } = req.body;
    const { id } = req.params;
    if (state === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const result = await connection.query(`UPDATE cupones  SET state = ${state} WHERE id = ${id}`);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const deleteCupon = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query('DELETE FROM cupones WHERE id = ?', id);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

export const methods = {
  getCuponesCount,
  getCupones,
  getCuponesRuleta,
  getCupon,
  addCupon,
  updateCupon,
  stateCupon,
  stockCupon,
  deleteCupon,
};
