import { Router } from 'express';
import { methods as TypesFoodController } from '../controllers/types_food.controller';

const router = Router();
router.post('/categori', TypesFoodController.addCategoriaCompanie);
router.get('/:id', TypesFoodController.getTypesFood);
router.delete('/:id', TypesFoodController.deleteCategorie);
export default router;
