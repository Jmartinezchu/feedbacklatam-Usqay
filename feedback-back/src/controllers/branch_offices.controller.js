import { getConnection } from './../database/database';

const getBranchOffices = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query(
      `SELECT b.* FROM branch_offices b INNER JOIN companies c on c.id = b.id_companie WHERE id_companie = ${id}`
    );
    // `SELECT b.*, c.name,c.description,c.city,t.name,t.description FROM branch_offices b INNER JOIN companies c on c.id = b.id_company INNER JOIN types_food t on t.id = c.typesfoodid  WHERE id_company = ${id}`

    // console.log(result);
    if (result.length > 0) {
      res.json(result);
    } else {
      res.json(result);
    }
    // res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const getBranchOffice = async (req, res) => {
  try {
    const connection = await getConnection();
    const { idbranch } = req.params;
    const result = await connection.query(`SELECT * FROM branch_offices WHERE id = ${idbranch}`);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const addBranchOffice = async (req, res) => {
  try {
    const { name, city, state, address, id_companie } = req.body;

    if (name === undefined || city === undefined || state === undefined || address === undefined || id_companie === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const ofices = {
      name,
      city,
      state,
      address,
      id_companie,
    };
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO branch_offices SET ?', ofices);
    res.json({ deploy: result, message: 'La compañia se registro correctamente ' });
    // console.log(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
    // console.log(error.fatal);
  }
};
const stateOffice = async (req, res) => {
  try {
    const connection = await getConnection();
    const { state } = req.body;
    const { id } = req.params;
    if (state === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const result = await connection.query('UPDATE branch_offices  SET state = ? WHERE id = ?', [state, id]);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const updateOfficce = async (req, res) => {
  try {
    const connection = await getConnection();
    const { name, city, address } = req.body;
    const { id } = req.params;

    if (name === undefined || city === undefined || address === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const office = {
      name,
      city,
      address,
    };
    const result = await connection.query(`UPDATE branch_offices SET ? WHERE id = ${id}`, office);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

export const methods = {
  getBranchOffices,
  getBranchOffice,
  addBranchOffice,
  stateOffice,
  updateOfficce,
};
