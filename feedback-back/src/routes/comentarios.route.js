import { Router } from 'express';
import { methods as ComentariosController } from '../controllers/comentraios.controller';

const router = Router();

router.post('/', ComentariosController.addComntario);
// router.get('/', BussinesController.getCompanies);
router.get('/count/:id_companie', ComentariosController.getComentariosCount);
router.get('/countType/:id_companie/:id_typeComent', ComentariosController.getComentariosCountType);
router.get('/countTypeSucu/:id_sucursal/:val_typeComent', ComentariosController.getComentariosCountTypeSucursal);
router.get('/list/:id_sucursal/:val_typeComent', ComentariosController.getlistComent);
// // router.delete('/:id', BussinesController.deleteCompanie);
// router.put('/state/:id', BussinesController.stateCompanie);
// router.put('/form/:id', BussinesController.updateCompanie);

export default router;
