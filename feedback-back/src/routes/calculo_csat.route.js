import { Router } from 'express';
import { methods as CalculoController } from './../controllers/calculo_csat.controller';

const router = Router();

router.get('/simple/:id_form/:id_companie/:id_res_question', CalculoController.countCsatFormSimple);
router.get('/multiple/:id_form/:id_companie/:id_res_question', CalculoController.countCsatFormMultiple);

export default router;
