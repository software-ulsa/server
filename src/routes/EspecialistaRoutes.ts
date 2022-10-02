import { Router } from "express";
import {
  createEspecialista,
  deleteEspecialista,
  getAllEspecialista,
  getEspecialistaByArea,
  getEspecialistaByEspecialidad,
  getEspecialistaById,
  updateEspecialista,
} from "../controllers/EspecialistaController";

const router = Router();
const prefix = "/especialistas";
const VerifyToken = require("../middleware/VerifyToken");

router.post(prefix, VerifyToken, createEspecialista);

router.get(prefix + "/:id", VerifyToken, getEspecialistaById);

router.get(
  prefix + "/getByEspecialidad/:especialidad",
  VerifyToken,
  getEspecialistaByEspecialidad
);

router.get(prefix + "/getByArea/:area", VerifyToken, getEspecialistaByArea);

router.get(prefix, VerifyToken, getAllEspecialista);

router.put(prefix + "/:id", VerifyToken, updateEspecialista);

router.delete(prefix + "/:id", VerifyToken, deleteEspecialista);

export default router;
