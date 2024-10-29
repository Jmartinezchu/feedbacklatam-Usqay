import { Router } from 'express';
import { methods as UserController } from './../controllers/user.controller';

const router = Router();

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.post('/', UserController.addUser);
router.delete('/:id', UserController.deleteUser);
router.put('/:id', UserController.updateUser);

export default router;
