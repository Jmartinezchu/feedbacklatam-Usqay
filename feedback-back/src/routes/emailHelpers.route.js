import { Router } from 'express';
import { methods as EmailController } from './../controllers/emailHelpers.controller';

const router = Router();

router.post('/', EmailController.msjComent);

export default router;
