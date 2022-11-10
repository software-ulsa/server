import { Router } from "express";
import {
  createCarrera,
  deleteCarrera,
  deleteManyCarrera,
  getAllCarreras,
  getCarreraById,
  updateCarrera,
} from "../../controllers/lookup/CarreraController";
const VerifyToken = require("../../middleware/VerifyToken");

const router = Router();
const prefix = "/carreras";

router.post(prefix, VerifyToken, createCarrera);

router.get(prefix + "/:id", VerifyToken, getCarreraById);

router.get(prefix, VerifyToken, getAllCarreras);

router.put(prefix + "/:id", VerifyToken, updateCarrera);

router.delete(prefix + "/:id", VerifyToken, deleteCarrera);

router.post(prefix + "/batch", VerifyToken, deleteManyCarrera);

export default router;
