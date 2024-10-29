import { getConnection } from './../database/database';

const getRecurrencias = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM recurrencia_cupones');

    res.json(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

const addRecurrencia = async (req, res) => {};

export const methods = {
  getRecurrencias,
  addRecurrencia,
};
