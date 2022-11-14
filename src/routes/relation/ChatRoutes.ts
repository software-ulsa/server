import { Router } from "express";
import {
  createMensaje,
  deleteManyMensaje,
  deleteMensaje,
  getAllMensajes,
} from "../../controllers/relation/ChatController";

const VerifyToken = require("../../middleware/VerifyToken");

const router = Router();
const prefix = "/mensajes";

router.post(prefix, VerifyToken, createMensaje);

router.get(prefix + "/:paciente&:especialista", VerifyToken, getAllMensajes);

router.delete(prefix + "/:id", VerifyToken, deleteMensaje);

router.post(prefix + "/batch", VerifyToken, deleteManyMensaje);

export default router;
