import { Router } from "express";
import {
  createPaciente,
  getAllPaciente,
  getAllByCarrera,
  getPacienteById,
  updatePaciente,
  deletePaciente,
} from "../controllers/PacienteController";

const router = Router();
const prefix = "/pacientes";
const VerifyToken = require("../middleware/VerifyToken");

router.post(prefix, VerifyToken, createPaciente);

router.get(prefix + "/:id", VerifyToken, getPacienteById);

router.get(prefix + "/getByCarrera/:carrera", VerifyToken, getAllByCarrera);

router.get(prefix, VerifyToken, getAllPaciente);

router.put(prefix + "/:id", updatePaciente);

router.delete(prefix + "/:id", VerifyToken, deletePaciente);

export default router;
