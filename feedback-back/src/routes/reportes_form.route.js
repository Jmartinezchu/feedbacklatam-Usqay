import { Router } from 'express';
import { methods as reportesFormRoutes } from '../controllers/reportes_form.controller';

const router = Router();

router.get('/:id_qr/:id_form', reportesFormRoutes.getRegistersForm);
router.get('/:id_qr/:id_form/:id_question/:id_res_question', reportesFormRoutes.countResponQuestionSimple);
router.get('/:id_qr/:id_form/:id_question/:id_question_sub/:id_res_question', reportesFormRoutes.countResponQuestionMultiple);
router.get('/numbers/:id_companie/:id_res_question', reportesFormRoutes.countResponQuestionNumbersGeneral);
router.get('/:id_qr/:dinicio/:dfinal', reportesFormRoutes.getReportesQr);
export default router;
