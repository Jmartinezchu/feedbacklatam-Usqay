import { Router } from 'express';
import { methods as Respons_subController } from './../controllers/respons_sub.controller';

const router = Router();
router.post('/', Respons_subController.addrespons_sub);
// router.get('/:id', QuestionController.getQuestions);

export default router;
