import { Router } from "express";
import { methods as AreasController } from "./../controllers/areas.controller"

const router = Router();

router.get('/', AreasController.getAreas)


export default router;