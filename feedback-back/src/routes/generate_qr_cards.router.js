import { Router } from 'express';
import { methods as QrController } from '../controllers/generate_qr_cards.controller';

const router = Router();
// Nuevas apis
router.post('/links', QrController.registerLinks);
router.get('/links/:id', QrController.getLinks);
router.delete('/links/:id', QrController.deleteQrRegiter);
router.get('/links/one/:id', QrController.getLink);
router.put('/links/:id_companie/:id', QrController.updateQr);
router.put('/state/:id', QrController.stateQr);
router.delete('/links/one/:id', QrController.deleteQr);

// Olds apis
router.post('/', QrController.addQr);
router.get('/:id', QrController.getQrs);
router.get('/one/:id', QrController.getQr);

router.delete('/:id', QrController.deleteQr);
export default router;
