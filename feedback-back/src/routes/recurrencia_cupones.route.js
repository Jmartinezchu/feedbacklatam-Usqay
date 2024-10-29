import { Router } from 'express';
import { methods as RecurrenciaCuponesController } from './../controllers/recurrencia_cupones.controller';

const router = Router();

router.get('/', RecurrenciaCuponesController.getRecurrencias);

export default router;
