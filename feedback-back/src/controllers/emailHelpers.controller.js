import { getConnection } from '../database/database';
import { DateFormat } from '../global/date-format';
const email = {};
const wait = (ms) => new Promise((r, j) => setTimeout(r, ms));
const nodemailer = require('nodemailer');

const userFrom = process.env.USER_FROM;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const msjComent = async (req, res) => {
  const { typeComent, cliente, empresa } = req.body;
  await wait(20);
  const dataMsj = {
    typeComent,
    cliente,
    empresa,
  };
  const connection = await getConnection();
  const companie = await connection.query(
    `SELECT c.*, i.filename , s.name as nameSucursal, s.city as ciudad, s.address as direccion FROM companies c INNER JOIN images i on i.id = c.logo INNER JOIN branch_offices s on s.id_companie = c.id WHERE s.id =${dataMsj.empresa.idsucursal}`
  );
  const sendemail = await connection.query(
    `SELECT nt.*, tc.valor FROM notifications nt INNER JOIN type_coments tc on tc.id = nt.id_typecoment WHERE nt.id_companie=${dataMsj.empresa.idcompanie} and nt.id_sucursal=${dataMsj.empresa.idsucursal} and tc.valor= '${dataMsj.typeComent}' and nt.state != 0`
  );
  // console.log(companie[0]);
  if (sendemail.length != 0) {
    sendCliente(sendemail, companie, dataMsj);
  }
  if (companie[0].gmail_notifications != null) {
    sendCompanie(companie[0], dataMsj);
  }
};
function sendCliente(sendemail, companie, dataMsj) {
  let icons;
  if (dataMsj.typeComent === 'Felicitaciones') {
    icons = '🥳🎉';
  }
  if (dataMsj.typeComent === 'Sugerencias') {
    icons = '📌📝';
  }
  if (dataMsj.typeComent === 'Reclamos') {
    icons = '😓🤕';
  }
  const subject = ` ${sendemail[0].subject} ${icons} `;

  let urllogo = `https://feedback-backend-buzg8.ondigitalocean.app/logos/${companie[0].filename}`;
  let body =
    `
<div>
  <div style="text-align: center">
      <img style="width:100px; border-radius: 50%  "
      src="` +
    urllogo +
    `" alt="empresa">
  </div>
  <h3 style="text-align: center">${sendemail[0].slogan}</h3>
  <p>
  </p>
  <p>¡Hola<span style="text-transform: uppercase;"> ${dataMsj.cliente.nombre}!🙋🏽</span>; </p>
  <textarea disabled rows="11" placeholder="Mensaje"
  style="background-color: #ffffff; border: none; color: #000000; width: 100%; " id="floatingTextarea">${sendemail[0].mensaje}</textarea>
  <br>
  <p>${sendemail[0].pie_mensaje} <b style="text-transform: uppercase;">${dataMsj.cliente.nombre}</b></p>

  <div>
      <img style="width: 150px;" src="https://feedback-backend-buzg8.ondigitalocean.app/images/Logo.png" alt="feedbackLatam">
  </div>
</div>
`;
  sendMail(subject, body, dataMsj.cliente.email);
}
function sendCompanie(companie, dataMsj) {
  const subject = `Tienes un nuevo comentario de ${dataMsj.typeComent} 📫`;
  let body = `
<div>
  <div style="text-align: center">
  <img style="width: 150px;" src="https://feedback-backend-buzg8.ondigitalocean.app/images/Logo.png" alt="feedbackLatam">
  </div>
  <h3>Te ayudamos a estar al pendiente de tus clientes</h3>
  <p>
  </p>
  <p>¡Hola<span style="text-transform: uppercase;"> ${companie.name}!🙋🏽</span>; </p>
  <p>
      Tienes nuevo comentario de ${dataMsj.typeComent} registrado en la sucursal ${companie.nameSucursal}-${companie.ciudad}-${companie.direccion}.
      <br>
      Ingresa a <a href="https://feedbacklatam.com/auth/login">Feedbacklatam.com</a> para leerlo.
  </p>
  <br>
  <p><b>Feedback contigo para mantener satisfechos a tus clientes</b></p>

  <div>
      <img style="width: 150px;" src="https://feedback-backend-buzg8.ondigitalocean.app/images/Logo.png" alt="feedbackLatam">
  </div>
</div>
`;
  sendMail(subject, body, companie.gmail_notifications);
}

async function sendMail(subject, body, email) {
  await wait(10);

  var message = {
    from: `"Feedback" <${userFrom}>`,
    to: email,
    subject: subject,
    html: body,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log('Error enviando email', error.message);
    }
  });
}
export const methods = {
  msjComent,
};
