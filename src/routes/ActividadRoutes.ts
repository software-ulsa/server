import { Router } from "express";
import {
  createActividad,
  deleteActividad,
  deleteManyActividad,
  getActividadById,
  getAllActividad,
  getAllActividadByCursoId,
  updateActividad,
} from "../controllers/ActividadController";

const router = Router();
const prefix = "/actividades";
const VerifyToken = require("../middleware/VerifyToken");

router.post(prefix, VerifyToken, createActividad);

router.get(prefix + "/:id", VerifyToken, getActividadById);

router.get(prefix, VerifyToken, getAllActividad);

router.get(prefix + "/curso/:id_curso", VerifyToken, getAllActividadByCursoId);

router.put(prefix + "/:id", VerifyToken, updateActividad);

router.delete(prefix + "/:id", VerifyToken, deleteActividad);

router.post(prefix + "/batch", VerifyToken, deleteManyActividad);

export default router;
