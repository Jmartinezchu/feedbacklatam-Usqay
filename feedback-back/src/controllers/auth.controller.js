import { DateFormat } from '../global/date-format';

const statusSuccess = 'success';
const statusError = 'error';
import { getConnection } from './../database/database';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // let hashmd5 = md5(password);

    if (email === undefined || password === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const connection = await getConnection();
    let result = await connection.query(
      `
      SELECT u.id as idUser,DATE_FORMAT(c.created_at, '${DateFormat}') as iniOperaciones, u.name as nameUser, u.email, u.rol_id, r.name as nameRol, c.state as stateCompanie, 
      c.id as idCompanie, c.name as nameCompanie
      FROM users u 
      INNER JOIN companies c on c.id = u.compani_id 
      INNER JOIN type_companie t on t.id = c.type_companie 
      INNER JOIN roles r on r.id = u.rol_id 
      INNER JOIN images i on i.id = c.logo
      WHERE u.email='${email}' AND u.password= '${password}';
      `
    );
    if (result.length == 0) {
      result = await connection.query(
        `
        SELECT u.id as idUser,DATE_FORMAT(c.created_at, '${DateFormat}') as iniOperaciones, u.name as nameUser, u.usuario as email, u.rol as rol_id, r.name as nameRol, c.state as stateCompanie, 
        c.id as idCompanie, c.name as nameCompanie
        FROM personal u 
        INNER JOIN companies c on c.id = u.compani_id 
        INNER JOIN type_companie t on t.id = c.type_companie 
        INNER JOIN roles r on r.id = u.rol 
        INNER JOIN images i on i.id = c.logo
        WHERE u.usuario='${email}' AND u.password= '${password}';
        `
      );
      if (result.length == 0) {
        result = await connection.query(
          `
          SELECT cl.*,DATE_FORMAT(cl.nacimiento, '${DateFormat}') as fechaNacimiento,cl.id as idUser, r.name as nameRol, cl.state as stateCompanie, 
          c.id as idCompanie, cl.nombre as nameCompanie FROM clients cl
          INNER JOIN companies c on c.id = cl.id_companie
          INNER JOIN roles r on r.id = cl.rol_id
          WHERE cl.email='${email}' AND cl.celular= '${password}';
          `
        );

        // res.json(result);
      }
      // res.json(result);
    }
    const companie = await connection.query(
      `SELECT c.*,DATE_FORMAT(c.created_at, '${DateFormat}') as iniOperaciones, i.id as id_logo, i.nombre as nameImage, i.filename  FROM companies c INNER JOIN images i on i.id = c.logo WHERE c.id = ${result[0].idCompanie} `
    );
    const items = await connection.query(
      `SELECT p.*, m.*, r.name as name_Rol FROM permisos p INNER JOIN modulos m on m.id = p.id_modulo INNER JOIN roles r on r.id = p.id_rol WHERE r.id = ${result[0].rol_id} and m.estado!= 0;`
    );

    const login = {
      user: result[0],
      companie,
      items,
    };
    res.json(login);
    // console.log(result[0]);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const getRutes = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query(
      'SELECT p.*, m.*, r.name as name_Rol FROM permisos p INNER JOIN modulos m on m.id = p.id_modulo INNER JOIN roles r on r.id = p.id_rol WHERE r.id = ? and m.estado!= 0;',
      id
    );
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

export const methods = {
  login,
  getRutes,
};
