import { Router } from "express";
import {
  createCurso,
  deleteCurso,
  deleteManyCurso,
  getAllCurso,
  getCursoById,
  getCursoByKeyword,
  updateCurso,
} from "../controllers/CursoController";

const router = Router();
const prefix = "/cursos";
const VerifyToken = require("../middleware/VerifyToken");

router.post(prefix, VerifyToken, createCurso);

router.get(prefix + "/:id", VerifyToken, getCursoById);

router.get(prefix, VerifyToken, getAllCurso);

router.put(prefix + "/:id", VerifyToken, updateCurso);

router.delete(prefix + "/:id", VerifyToken, deleteCurso);

router.post(prefix + "/batch", VerifyToken, deleteManyCurso);

router.get(prefix + "/getCurso/filter",  getCursoByKeyword);

export default router;
