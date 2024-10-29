import { Router } from 'express';
import { methods as ResponsController } from './../controllers/respons.controller';

const router = Router();
router.post('/', ResponsController.addrespons);
// router.get('/:id', QuestionController.getQuestions);

export default router;
