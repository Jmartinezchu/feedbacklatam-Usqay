import { Router } from 'express';
import { methods as ClienteCuponesController } from './../controllers/cliente_cupones.controller';

const router = Router();

router.get('/:id', ClienteCuponesController.getCupones);

export default router;
