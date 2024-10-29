import { Router } from 'express';
import { methods as CuponesController } from './../controllers/cupones.controller';

const router = Router();

router.post('/', CuponesController.addCupon);
router.get('/count/:id_companie', CuponesController.getCuponesCount);
router.get('/:id', CuponesController.getCupones);
router.get('/ruleta/:id', CuponesController.getCuponesRuleta);
router.get('/:id/:idcupon', CuponesController.getCupon);
router.put('/state/:id', CuponesController.stateCupon);
router.put('/stock/:id', CuponesController.stockCupon);
router.put('/form/:id', CuponesController.updateCupon);
router.delete('/:id', CuponesController.deleteCupon);

export default router;
