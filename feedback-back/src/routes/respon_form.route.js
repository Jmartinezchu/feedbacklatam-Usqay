import { Router } from 'express';
import { methods as FormResponController } from './../controllers/respon_form.controller';

const router = Router();
router.post('/', FormResponController.addFormRespon);
// router.get('/:id', QuestionController.getQuestions);

export default router;
