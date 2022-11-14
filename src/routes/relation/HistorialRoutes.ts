import { Router } from "express";
import {
  createActivityComplete,
  deleteActivityComplete,
  getProgressByUserId,
} from "../../controllers/relation/HistorialController";

const VerifyToken = require("../../middleware/VerifyToken");

const router = Router();
const prefix = "/progreso";

router.post(prefix, VerifyToken, createActivityComplete);

router.get(prefix + "/:paciente&:curso", VerifyToken, getProgressByUserId);

router.delete(
  prefix + "/:paciente&:curso&:actividad",
  VerifyToken,
  deleteActivityComplete
);

export default router;
