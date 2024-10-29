import { Router } from 'express';
import { methods as FormulariosController } from './../controllers/formularios.controller';

const router = Router();

router.post('/', FormulariosController.addFormulario);
router.get('/:id', FormulariosController.getfomularios);
router.get('/:id/:idform', FormulariosController.getFormulario);
router.put('/state/:id', FormulariosController.stateformulario);
router.put('/form/:id', FormulariosController.updateform);
router.delete('/:id', FormulariosController.deleteFormulario);
export default router;
