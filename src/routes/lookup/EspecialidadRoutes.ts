import { Router } from "express";
import {
  createEspecialidad,
  deleteEspecialidad,
  deleteManyEspecialidad,
  getAllEspecialidades,
  getEspecialidadById,
  updateEspecialidad,
} from "../../controllers/lookup/EspecialidadController";
const VerifyToken = require("../../middleware/VerifyToken");

const router = Router();
const prefix = "/especialidades";

router.post(prefix, VerifyToken, createEspecialidad);

router.get(prefix + "/:id", VerifyToken, getEspecialidadById);

router.get(prefix, VerifyToken, getAllEspecialidades);

router.put(prefix + "/:id", VerifyToken, updateEspecialidad);

router.delete(prefix + "/:id", VerifyToken, deleteEspecialidad);

router.post(prefix + "/batch", VerifyToken, deleteManyEspecialidad);

export default router;
