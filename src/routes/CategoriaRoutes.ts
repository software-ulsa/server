import { Router } from "express";
import {
  createCategoria,
  deleteManyCategoria,
  deleteCategoria,
  getAllCategorias,
  getCategoriaById,
  updateCategoria,
} from "../controllers/lookup/CategoriaController";
const VerifyToken = require("../middleware/VerifyToken");

const router = Router();
const prefix = "/categoria";

router.post(prefix, VerifyToken, createCategoria);

router.get(prefix + "/:id", VerifyToken, getCategoriaById);

router.get(prefix, VerifyToken, getAllCategorias);

router.put(prefix + "/:id", VerifyToken, updateCategoria);

router.delete(prefix + "/:id", VerifyToken, deleteCategoria);

router.post(prefix + "/batch", VerifyToken, deleteManyCategoria);

export default router;
