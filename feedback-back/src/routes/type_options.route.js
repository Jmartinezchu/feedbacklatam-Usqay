import { Router } from 'express';
import { methods as TypesOptionsController } from '../controllers/type_options.controller';

const router = Router();

router.get('/', TypesOptionsController.getTypesOptions);
router.put('/:idForm', TypesOptionsController.updateTypeOptionsForm);

export default router;
