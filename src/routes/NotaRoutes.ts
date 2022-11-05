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

router.post(prefix,   createNota);

router.get(prefix + "/:id",   getNotaById);

router.post(prefix + "/getByKeyword",   getNotaByKeyword);

router.get(prefix,   getAllNotas);

router.put(prefix + "/:id",   updateNota);

router.delete(prefix + "/:id",   deleteNota);

router.post(prefix + "/batch",   deleteManyNota);

export default router;
