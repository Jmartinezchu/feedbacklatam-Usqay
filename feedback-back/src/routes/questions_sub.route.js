import { Router } from 'express';
import { methods as QuestionSubController } from './../controllers/question_sub.controller';

const router = Router();

router.post('/', QuestionSubController.addQuestionSub);
router.get('/:id', QuestionSubController.getQuestionsSub);
router.delete('/:id', QuestionSubController.deletesubtituloquestion);
export default router;
