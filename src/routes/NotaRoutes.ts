import { Router } from "express";
import {
  createNota,
  deleteManyNota,
  deleteNota,
  getAllNotas,
  getNotaById,
  getNotaByKeyword,
  updateNota,
} from "../controllers/NotaController";

const router = Router();
const prefix = "/notas";
const VerifyToken = require("../middleware/VerifyToken");

router.post(prefix, VerifyToken, createNota);

router.get(prefix + "/:id", VerifyToken, getNotaById);

router.get(prefix + "/getByKeyword", VerifyToken, getNotaByKeyword);

router.get(prefix, VerifyToken, getAllNotas);

router.put(prefix + "/:id", VerifyToken, updateNota);

router.delete(prefix + "/:id", VerifyToken, deleteNota);

router.post(prefix + "/batch", VerifyToken, deleteManyNota);

export default router;
