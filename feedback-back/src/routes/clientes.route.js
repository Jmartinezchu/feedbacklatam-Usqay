import { Router } from 'express';
import { methods as ClientesController } from '../controllers/clientes.controller';

const router = Router();

// router.get('/', BussinesController.getCompanies);
router.get('/:id', ClientesController.getcliente);
router.post('/', ClientesController.addCliente);
router.get('/verifiCel/:celular', ClientesController.verifiCliente);
router.get('/email/:email', ClientesController.verifiEmail);
router.get('/count/:id_companie', ClientesController.getclientesCount);
router.get('/list/:id_companie', ClientesController.getlistclientsCompanie);
// // router.delete('/:id', BussinesController.deleteCompanie);
// router.put('/state/:id', BussinesController.stateCompanie);
router.put('/form/:id', ClientesController.updateCliente);

export default router;
