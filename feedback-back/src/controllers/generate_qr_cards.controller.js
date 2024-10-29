import { getConnection } from '../database/database';

const addQr = async (req, res) => {
  try {
    const { link, nombre, autor, gmail, id_companie } = req.body;

    if (link === undefined || nombre === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const qr = {
      link,
      nombre,
      autor,
      gmail,
      id_companie,
    };
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO cartas_links SET ?', qr);
    res.json({ message: 'El qr a sido generado ' });
    // console.log(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
    // console.log(error.message);
  }
};
const getQrs = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query(
      `SELECT q.*, c.name as nameCompanie
      FROM cartas_links q 
      INNER JOIN companies c on c.id = q.id_companie 
      WHERE q.id_companie =${id}`
    );

    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const getQr = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query(
      `SELECT q.*, c.name as nameCompanie
      FROM cartas_links q 
      INNER JOIN companies c on c.id = q.id_companie 
      WHERE q.id =${id}`
    );

    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

const stateQr = async (req, res) => {
  try {
    const connection = await getConnection();
    const { state } = req.body;
    const { id } = req.params;
    if (state === undefined) {
      res.status(400).json({ message: 'Por favor, completar todos los campos.' });
    }

    const result = await connection.query('UPDATE registerlinks  SET state = ? WHERE id = ?', [state, id]);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const deleteQr = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query('DELETE FROM data_links WHERE id = ?', id);
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const registerLinks = async (req, res) => {
  try {
    const { dataRegisterLinks } = req.body;
    const registerlinks = {
      id_companie: dataRegisterLinks.id_companie,
      id_sucursal: dataRegisterLinks.id_sucursal,
      id_user: dataRegisterLinks.id_user,
    };
    const connection = await getConnection();
    const addRegister = await connection.query('INSERT INTO registerlinks SET ?', registerlinks);
    const id_register_links = addRegister.insertId;
    const links = dataRegisterLinks.links;
    const length_links = links.length;

    for (let index = 0; index < length_links; index++) {
      const link = {
        link: links[index].link,
        name: links[index].name,
        id_register_links: id_register_links,
      };
      const addRegister = await connection.query('INSERT INTO data_links SET ?', link);
      // console.log('link registrado y asigando al qr', id_register_links);
      // console.log(link);
    }
    // console.log(dataRegisterLinks.links);
    res.json({ message: 'El qr a sido generado ' });
  } catch (error) {
    console.log(error);
  }
};
const getLinks = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const listQrregister = await connection.query(
      `SELECT r.*, b.name as sucursal, b.city, b.address
      FROM registerlinks r
      INNER JOIN companies c on c.id = r.id_companie 
      INNER JOIN branch_offices b on b.id = r.id_sucursal 
      WHERE r.id_companie =${id}`
    );
    const listQRLenghth = listQrregister.length;
    for (let index = 0; index < listQRLenghth; index++) {
      let idRegisterLink = listQrregister[index].id;
      const listLinks = await connection.query(
        `SELECT *
        FROM data_links 
        WHERE id_register_links = ${idRegisterLink}`
      );
      if (listLinks.length != 0) {
        listQrregister[index].qr_linksdata = listLinks;
      }
    }
    res.json(listQrregister);
  } catch (error) {
    console.log(error);
  }
};
const deleteQrRegiter = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query('DELETE FROM registerlinks WHERE id = ?', id);
    res.json('Eliminado');
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};
const getLink = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const listQrregister = await connection.query(
      `SELECT r.id, r.qr_linksdata, r.state, b.name as sucursal, b.city, b.address,c.description ,i.filename
      FROM registerlinks r
      INNER JOIN companies c on c.id = r.id_companie 
      INNER JOIN branch_offices b on b.id = r.id_sucursal 
      INNER JOIN images i on i.id = c.logo
      WHERE r.id =${id}`
    );
    const listQRLenghth = listQrregister.length;
    for (let index = 0; index < listQRLenghth; index++) {
      let idRegisterLink = listQrregister[index].id;
      const listLinks = await connection.query(
        `SELECT *
        FROM data_links 
        WHERE id_register_links = ${idRegisterLink}`
      );
      if (listLinks.length != 0) {
        listQrregister[index].qr_linksdata = listLinks;
      }
    }
    res.json(listQrregister);
  } catch (error) {
    console.log(error);
    res.json('error');
  }
};
const updateQr = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_companie, id } = req.params;

    const { dataeditQr } = req.body;

    const registerg = {
      id_sucursal: dataeditQr.id_sucursal,
      id_user: dataeditQr.id_user,
    };

    const datalinks = dataeditQr.qr_linksdata;

    const lengthdatalinks = datalinks.length;
    // console.log(qstsub.sub_titulos);
    const result = await connection.query(`UPDATE registerlinks SET ? WHERE id_companie=${id_companie} and id =${id}`, registerg);
    for (let index = 0; index < lengthdatalinks; index++) {
      if (datalinks[index].id === undefined) {
        const linkNew = {
          link: datalinks[index].link,
          name: datalinks[index].name,
          id_register_links: datalinks[index].id_register_links,
        };
        const result = await connection.query('INSERT INTO data_links SET ?', linkNew);

        // console.log('nuevo registro');
      } else {
        const link = {
          link: datalinks[index].link,
          name: datalinks[index].name,
        };
        const result = await connection.query(`UPDATE data_links SET ? WHERE id =  ${datalinks[index].id}`, link);
        // console.log('se actualiza');
      }
    }

    res.json('Actualizado!!');
    // console.log('actualizado todo');
  } catch (error) {
    console.log(error);
  }
};

export const methods = {
  addQr,
  getQrs,
  stateQr,
  deleteQr,
  getQr,

  // new links
  registerLinks,
  getLinks,
  deleteQrRegiter,
  getLink,
  updateQr,
};
