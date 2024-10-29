import { Router } from 'express';
import { methods as BussinesController } from '../controllers/bussines.controller';

const router = Router();

router.get('/', BussinesController.getCompanies);
router.get('/filtertcomp/:id', BussinesController.filterTypecompanie);
router.get('/ultimaRespons/:id', BussinesController.ultimaRespons);
router.get('/:id', BussinesController.getCompanie);
router.post('/', BussinesController.addCompanie);
router.delete('/:id', BussinesController.deleteCompanie);
router.delete('/user/:id', BussinesController.deleteUser);
router.put('/state/:id', BussinesController.stateCompanie);
router.put('/form/:id', BussinesController.updateCompanie);
router.get('/countRegister/:id_companie', BussinesController.getEncuestadosCount);
export default router;
