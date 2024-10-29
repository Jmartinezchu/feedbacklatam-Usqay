const multer = require('multer');
const path = require('path');
// const upload = multer({dest : 'uploads/'})

import { getConnection } from '../database/database';

const storage = multer.diskStorage({
  // dest: 'uploads/',
  destination: path.join(__dirname, '../../public/logos'),
  // destination: path.join(__dirname, '../../postman'),

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).single('image');

const uploadFile = async (req, res, next) => {
  try {
    const tipo = req.file.mimetype;
    const nombre = req.file.originalname;
    const fileName = req.file.filename;
    const URL = req.file.path;
    // console.log(req.file);
    const image = {
      tipo,
      nombre,
      fileName,
      URL,
    };
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO images SET ?', image);
    res.json({ res: result, message: 'la imagen se registro correctamente ' });
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
  }

  // req.getConnection((err, conn) => {
  //   if (err) return res.send(err);

  //   conn.query('INSERT INTO images set ?'[{ tipo, nombre }], (err, rows) => {
  //     console.log(err ? 'error:' + err : 'success');
  //   });
  //   res.json(err ? { err: 'Error al cargar la imagen' } : { err: 'imagen cragado correctamente' });
  // });
};
const getImage = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_logo } = req.params;
    const result = await connection.query(
      `SELECT i.*
      FROM companies c
      INNER JOIN images i on i.id = c.logo 
      WHERE c.logo =${id_logo}`
    );
    // console.log(result);
    res.json(result);
  } catch (error) {
   // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

export const methods = {
  upload,
  uploadFile,
  getImage,
};
