import express from 'express';
import morgan from 'morgan';
const cors = require('cors');

// Routers
import userRoutes from './routes/user.route';
import bussinesRoutes from './routes/bussines.route';
import typesComanieRoutes from './routes/types_companie.route';
import typesFoodRoutes from './routes/types_food.route';
import branchOfficesRoutes from './routes/branch_offices.route';
import cuponesRoutes from './routes/cupones.route';
import authRoute from './routes/auth.route';
import areasRoutes from './routes/areas.route';
import recurrencesRoutes from './routes/recurrencia_cupones.route';
import rolesRoutes from './routes/roles.route';
import personalRoutes from './routes/personal.route';
import formulariosRoutes from './routes/formularios.route';
import generateQrRoutes from './routes/generate_qr.router';
import clientsRoutes from './routes/clientes.route';
import comentariosRoutes from './routes/comentarios.route';
import cuponesganadosRoutes from './routes/cupones_ganados.route';
import imagesRoutes from './routes/images.route';
import questionRoutes from './routes/question.route';
import questionSubRoutes from './routes/questions_sub.route';
import responsRoutes from './routes/respons.route';
import responsSubRoutes from './routes/respons_sub.route';
import responFormRoutes from './routes/respon_form.route';
import reportesFormRoutes from './routes/reportes_form.route';
import calculoCsat from './routes/calculo_csat.route';
import clienteCuponesRoute from './routes/cliente_cupones.route';
import typeOptionsRoute from './routes/type_options.route';
import generateQrCardsRoutes from './routes/generate_qr_cards.router';
import sendEmail from './routes/emailHelpers.route';
import notifications from './routes/notifications.route';
import type_coments from './routes/type_coments.route';
import home from './routes/home.route';
const app = express();

// app.use(cors())
// app.set('port', 80);
app.set('port', 8080);

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/', express.static('public'));
// Routes

app.get('/test', (req, res) => {
  console.log('This is a test function route');
  const enviromentValue = process.env.TEST_ENVIRONMENT;
  res.json(`Hello world with ${enviromentValue}`);
});
app.use('/api/login', authRoute);
app.use('/api/users', userRoutes);
app.use('/api/companies', bussinesRoutes);
app.use('/api/cupones', cuponesRoutes);
app.use('/api/type_companie', typesComanieRoutes);
app.use('/api/types', typesFoodRoutes);
app.use('/api/branchoffices', branchOfficesRoutes);
app.use('/api/areas', areasRoutes);
app.use('/api/recurenciaCupon', recurrencesRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/personal', personalRoutes);
app.use('/api/formularios', formulariosRoutes);
app.use('/api/generateQr', generateQrRoutes);
app.use('/api/clientes', clientsRoutes);
app.use('/api/comentarios', comentariosRoutes);
app.use('/api/cupones_ganados', cuponesganadosRoutes);
app.use('/api/images', imagesRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/questionSub', questionSubRoutes);
app.use('/api/respons', responsRoutes);
app.use('/api/respons_sub', responsSubRoutes);
app.use('/api/formRespon', responFormRoutes);
app.use('/api/reportes_form', reportesFormRoutes);
app.use('/api/calculocsat', calculoCsat);
app.use('/api/cliente_cupones', clienteCuponesRoute);
app.use('/api/type_options', typeOptionsRoute);
app.use('/api/qrlinks', generateQrCardsRoutes);
app.use('/api/email', sendEmail);
app.use('/api/notifications', notifications);
app.use('/api/type_coments', type_coments);
app.use('/api/home', home);
export default app;
