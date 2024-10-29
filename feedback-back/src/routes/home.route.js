import { Router } from 'express';
import { methods as homecontroller } from '../controllers/home.controller';

const router = Router();

router.get('/:id_companie', homecontroller.getHome);
router.get('/coments/:id_companie', homecontroller.getcoments);
router.get('/logos/clientes/img', homecontroller.getlogosClientes);
export default router;
