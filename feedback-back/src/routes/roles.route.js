import { Router } from 'express';
import { methods as RolesController } from '../controllers/roles.controller';

const router = Router();

router.get('/', RolesController.getRoles);

export default router;
