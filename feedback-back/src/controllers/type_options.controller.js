import { getConnection } from '../database/database';

const getTypesOptions = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM type_options');
    res.json(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const updateTypeOptionsForm = async (req, res) => {
  try {
    const connection = await getConnection();
    const { type_options } = req.body;
    const { idForm } = req.params;
    if (type_options === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const result = await connection.query('UPDATE formularios  SET type_options = ? WHERE id = ?', [type_options, idForm]);
    res.json(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

export const methods = {
  getTypesOptions,
  updateTypeOptionsForm,
};
