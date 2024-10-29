import { Router } from 'express';
import { methods as TypeComentContrroller } from '../controllers/type_coments.controller';

const router = Router();

router.get('/:typeComent', TypeComentContrroller.getTypeComent);

export default router;
