import { Router } from "express";
import {
  createEspecialista,
  getAllEspecialista,
  getAllByEspecialidad,
  getEspecialistaById,
  updateEspecialista,
  deleteEspecialista,
} from "../controllers/EspecialistaController";

const router = Router();
const prefix = "/especialistas";
const VerifyToken = require("../middleware/VerifyToken");

router.post(prefix, VerifyToken, createEspecialista);

router.get(prefix + "/:id", VerifyToken, getEspecialistaById);

router.get(
  prefix + "/getByEspecialidad/:especialidad",
  VerifyToken,
  getAllByEspecialidad
);

router.get(prefix, VerifyToken, getAllEspecialista);

router.put(prefix + "/:id", updateEspecialista);

router.delete(prefix + "/:id", VerifyToken, deleteEspecialista);

export default router;
