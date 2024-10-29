import { getConnection } from '../database/database';

const getRoles = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM roles');
    res.json(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

export const methods = {
  getRoles,
};
