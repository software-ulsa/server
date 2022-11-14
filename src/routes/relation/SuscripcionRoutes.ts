import { Router } from "express";
import {
  createSuscripcion,
  deleteSuscripcion,
  getSuscriptionsByUserId,
} from "../../controllers/relation/SuscripcionController";

const VerifyToken = require("../../middleware/VerifyToken");

const router = Router();
const prefix = "/suscripciones";

router.post(prefix, VerifyToken, createSuscripcion);

router.get(prefix + "/:paciente", VerifyToken, getSuscriptionsByUserId);

router.delete(prefix + "/:paciente&:curso", VerifyToken, deleteSuscripcion);

export default router;
