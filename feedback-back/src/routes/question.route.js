import { Router } from 'express';
import { methods as QuestionController } from './../controllers/question.controller';

const router = Router();
router.get('/options', QuestionController.getOptions);
router.post('/', QuestionController.addQuestion);
router.get('/:id', QuestionController.getQuestions);
router.get('/admin/:id', QuestionController.getQuestionsAdmin);
router.put('/state/:id', QuestionController.stateQuestion);
router.delete('/:id', QuestionController.deleteQuestion);
router.get('/:idform/:id/:tipo', QuestionController.getQuestion);
router.put('/:idform/:id/:tipo', QuestionController.updateQuestion);
export default router;
