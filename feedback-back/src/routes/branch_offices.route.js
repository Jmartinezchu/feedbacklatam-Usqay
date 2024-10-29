import { Router } from 'express';
import { methods as BranchOfficesController } from './../controllers/branch_offices.controller';

const router = Router();

router.post('/', BranchOfficesController.addBranchOffice);
router.get('/:id', BranchOfficesController.getBranchOffices);
router.get('/:id/:idbranch', BranchOfficesController.getBranchOffice);
router.put('/state/:id', BranchOfficesController.stateOffice);
router.put('/form/:id', BranchOfficesController.updateOfficce);

export default router;
