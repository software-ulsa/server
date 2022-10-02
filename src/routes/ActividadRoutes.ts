import { Router } from "express";
import {
  createActividad,
  deleteActividad,
  getActividadById,
  getAllActividad,
  updateActividad,
} from "../controllers/ActividadController";

const router = Router();
const prefix = "/actividades";
const VerifyToken = require("../Middleware/VerifyToken");

router.post(prefix, VerifyToken, createActividad);

router.get(prefix + "/:id", VerifyToken, getActividadById);

router.get(prefix, VerifyToken, getAllActividad);

router.put(prefix + "/:id", VerifyToken, updateActividad);

router.delete(prefix + "/:id", VerifyToken, deleteActividad);

export default router;
