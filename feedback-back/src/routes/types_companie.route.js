import { Router } from 'express';
import { methods as TypesFoodController } from '../controllers/types_companies.controller';

const router = Router();

router.post('/', TypesFoodController.addTypeCompanie);
router.get('/', TypesFoodController.getTypes);
router.get('/:id', TypesFoodController.getType);
router.delete('/:id', TypesFoodController.deleteType);
export default router;
