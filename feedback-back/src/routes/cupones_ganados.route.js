import { Router } from 'express';
import { methods as CuponesController } from './../controllers/cupones_ganados.controller';

const router = Router();

router.post('/', CuponesController.addCupon);
router.get('/:id', CuponesController.getCupones);
// router.get('/:id/:idcupon', CuponesController.getCupon);
router.put('/state/:codeCupon', CuponesController.stateCupon);
router.put('/vencido/:codeCupon', CuponesController.stateVencidoCupon);
router.put('/code_cupon/:id', CuponesController.putCodeCupon);

export default router;
