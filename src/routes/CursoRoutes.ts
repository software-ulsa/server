import { Router } from "express";
import {
  createCurso,
  deleteCurso,
  getAllCurso,
  getCursoById,
  updateCurso,
} from "../controllers/CursoController";
import { getRolById } from "../controllers/RolController";

const router = Router();
const prefix = "/cursos";
const VerifyToken = require("../middleware/VerifyToken");

router.post(prefix, VerifyToken, createCurso);

router.get(prefix + "/:id", VerifyToken, getCursoById);

router.get(prefix, VerifyToken, getAllCurso);

router.put(prefix + "/:id", VerifyToken, updateCurso);

router.delete(prefix + "/:id", VerifyToken, deleteCurso);

export default router;
