import { Router } from 'express';
import { methods as QrController } from '../controllers/generate_qr.controller';

const router = Router();

router.post('/', QrController.addQr);
router.get('/:id', QrController.getQrs);
router.get('/one/:id', QrController.getQr);
// router.get('/:id/:idform', QrController.getFormulario);
router.put('/state/:id', QrController.stateQr);
// router.put('/form/:id', QrController.updateform);
router.delete('/:id', QrController.deleteQr);
export default router;
