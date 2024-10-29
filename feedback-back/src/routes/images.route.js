import { Router } from 'express';
import { methods as imagesController } from '../controllers/images.controller';

const router = Router();

router.post('/', imagesController.upload, imagesController.uploadFile);
router.get('/:id_logo', imagesController.getImage);
export default router;
