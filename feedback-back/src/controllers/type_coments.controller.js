import { getConnection } from '../database/database';

const getTypeComent = async (req, res) => {
  try {
    const connection = await getConnection();
    const { typeComent } = req.params;
    const result = await connection.query(`SELECT * FROM type_coments WHERE valor= '${typeComent}'`);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const methods = {
  getTypeComent,
};
