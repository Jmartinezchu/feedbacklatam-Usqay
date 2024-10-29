import { Router } from 'express';
import { methods as notificationController } from '../controllers/notifications.controller';

const router = Router();

router.post('/', notificationController.addNotification);
router.get('/:id_companie/:id_sucursal', notificationController.getNotifications);
// router.get('/one/:id', notificationController.getQr);
// // router.get('/:id/:idform', notificationController.getFormulario);
router.put('/state/:id_companie/:id_sucursal/:id_notification', notificationController.stateNotification);
router.put('/form/:id_companie/:id_sucursal/:id_notification', notificationController.updateNotification);
// router.delete('/:id', notificationController.deleteQr);
export default router;
