import { getConnection } from '../database/database';

const addCategoriaCompanie = async (req, res) => {
  try {
    const { name, description, id_type_companie } = req.body;

    if (name === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const type = {
      name,
      description,
      id_type_companie,
    };
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO types_food SET ?', type);
    res.json({ message: 'El qr a sido generado ' });
    // console.log(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
    // console.log(error.message);
  }
};

const getTypesFood = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query(`SELECT * FROM types_food where id_type_companie= ${id}`);
    res.json(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

const deleteCategorie = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query('DELETE FROM types_food WHERE id = ?', id);
    res.json(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

export const methods = {
  addCategoriaCompanie,
  getTypesFood,
  deleteCategorie,
};
