import { getConnection } from './../database/database';

const addNotification = async (req, res) => {
  try {
    const { subject, slogan, mensaje, pie_mensaje, id_companie, id_sucursal, id_typeComent } = req.body;

    const notification = {
      subject,
      slogan,
      mensaje,
      pie_mensaje,
      id_companie,
      id_sucursal,
      id_typeComent,
    };
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO notifications SET ?', notification);
    res.json({ deploy: result, message: 'se registro correctamente' });
  } catch (error) {
    console.log(error);
  }
};
const getNotifications = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_companie, id_sucursal } = req.params;
    const result = await connection.query(
      `SELECT nt.*, tc.valor FROM notifications nt INNER JOIN type_coments tc on tc.id = nt.id_typecoment WHERE nt.id_companie=${id_companie} and nt.id_sucursal=${id_sucursal} ORDER BY nt.id_typecoment ASC`
    );
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};
const getnotification = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_companie, id_sucursal, id_notification } = req.params;
    const result = await connection.query(
      `SELECT nt.*, tc.valor FROM notifications nt INNER JOIN type_coments tc on tc.id = nt.id_typecoment WHERE nt.id_companie=${id_companie} and nt.id_sucursal=${id_sucursal}  and nt.id_sucursal=2 and nt.id= ${id_notification}`
    );
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};
const stateNotification = async (req, res) => {
  try {
    const connection = await getConnection();
    const { state } = req.body;
    const { id_companie, id_sucursal, id_notification } = req.params;
    if (state === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }
    const result = await connection.query(
      `UPDATE notifications as nt  SET state = ?  WHERE nt.id_companie=${id_companie} and nt.id_sucursal=${id_sucursal} and nt.id= ${id_notification}`,
      state
    );
    res.json('Actualizado');
  } catch (error) {
    console.log(error);
  }
};
const updateNotification = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_companie, id_sucursal, id_notification } = req.params;
    const { subject, slogan, mensaje, pie_mensaje } = req.body;

    const notification = {
      subject,
      slogan,
      mensaje,
      pie_mensaje,
    };
    const result = await connection.query(
      `UPDATE notifications as nt SET ?  WHERE nt.id_companie=${id_companie} and nt.id_sucursal=${id_sucursal} and nt.id= ${id_notification}`,
      notification
    );
    res.json('Actualizado');
  } catch (error) {
    console.log(error);
  }
};

export const methods = {
  addNotification,
  getNotifications,
  getnotification,
  stateNotification,
  updateNotification,
};
