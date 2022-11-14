import { Router } from "express";
import {
  acceptNota,
  createNota,
  deleteManyNota,
  deleteNota,
  getAllByUsuarioId,
  getAllNotas,
  getNotaById,
  getNotaByKeyword,
  rejectNota,
  updateNota,
} from "../controllers/NotaController";

const router = Router();
const prefix = "/notas";
const VerifyToken = require("../middleware/VerifyToken");

router.post(prefix, VerifyToken, createNota);

router.get(prefix + "/:id", VerifyToken, getNotaById);

router.post(prefix + "/getByKeyword", VerifyToken, getNotaByKeyword);

router.get(prefix, VerifyToken, getAllNotas);

router.get(prefix + "/getMyNotes/:usuario_id", VerifyToken, getAllByUsuarioId);

router.put(prefix + "/:id", VerifyToken, updateNota);

router.put(prefix + "/aceptar/:id", VerifyToken, acceptNota);

router.put(prefix + "/rechazar/:id", VerifyToken, rejectNota);

router.delete(prefix + "/:id", VerifyToken, deleteNota);

router.post(prefix + "/batch", VerifyToken, deleteManyNota);

export default router;
