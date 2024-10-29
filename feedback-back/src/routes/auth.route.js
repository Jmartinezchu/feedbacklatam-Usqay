import { Router } from 'express';
import { methods as AuthController } from './../controllers/auth.controller';

const router = Router();

router.post('/', AuthController.login);
router.get('/:id', AuthController.getRutes);
export default router;
