import { getConnection } from './../database/database';
import { DateFormat } from '../global/date-format';
const addComntario = async (req, res) => {
  try {
    const { comentario, id_typeComent, id_companie, id_sucursal, id_client } = req.body;

    if (
      comentario === undefined ||
      id_typeComent === undefined ||
      id_companie === undefined ||
      id_sucursal === undefined ||
      id_client === undefined
    ) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const coment = {
      comentario,
      id_typeComent,
      id_companie,
      id_sucursal,
      id_client,
    };
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO comentarios SET ?', coment);
    res.json({ message: 'El comentario se registro correctamente ' });
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const getComentariosCount = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_companie } = req.params;
    const result = await connection.query(`SELECT COUNT(*) as total FROM comentarios c WHERE c.id_companie =${id_companie}`);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const getComentariosCountType = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_companie, id_typeComent } = req.params;
    const result = await connection.query(
      `SELECT COUNT(*) as total FROM comentarios c WHERE c.id_companie = ${id_companie}  and c.id_typeComent =${id_typeComent}`
      // `SELECT COUNT(*) as total, tc.valor FROM comentarios c INNER JOIN type_coments tc on tc.id = c.id_typeComent WHERE c.id_companie = ${id_companie} group by tc.valor ORDER BY tc.id`
    );
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const getComentariosCountTypeSucursal = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_sucursal, val_typeComent } = req.params;
    const result = await connection.query(
      `SELECT COUNT(*) as total, tc.valor FROM comentarios c INNER JOIN type_coments tc on tc.id = c.id_typeComent WHERE c.id_sucursal = ${id_sucursal} and tc.valor ='${val_typeComent}'`
    );
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const getlistComent = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_sucursal, val_typeComent } = req.params;
    const result = await connection.query(
      `SELECT cm.id,cm.id_sucursal, cm.comentario,  DATE_FORMAT(cm.create_at, '${DateFormat}') as fecha_up ,tc.valor , cl.nombre, cl.celular, cl.email
      FROM comentarios cm 
      INNER JOIN clients cl on cl.id = cm.id_client 
      INNER JOIN type_coments tc on tc.id = cm.id_typeComent 
      WHERE cm.id_sucursal=${id_sucursal} AND tc.valor='${val_typeComent}' ORDER BY fecha_up DESC`
    );
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

export const methods = {
  addComntario,
  getComentariosCount,
  getComentariosCountType,
  getComentariosCountTypeSucursal,
  getlistComent,
};
