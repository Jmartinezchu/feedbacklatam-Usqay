import { Router } from 'express';
import { methods as PersonalController } from './../controllers/personal.controller';

const router = Router();

router.post('/', PersonalController.addPersonal);
router.get('/:id', PersonalController.getPersonals);
router.get('/:id/:idperson', PersonalController.getPersonal);
router.put('/state/:id', PersonalController.statePersonal);
router.put('/form/:id', PersonalController.updatePersonal);
router.delete('/:id', PersonalController.deletePersonal);
export default router;
