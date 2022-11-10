import { Router } from "express";

import {
  createPublicidad,
  getAllPublicidad,
  getPublicidadById,
  updatePublicidad,
  deletePublicidad,
  deleteManyPublicidad,
} from "../controllers/PublicidadController";

const router = Router();
const prefix = "/publicidad";
const VerifyToken = require("../middleware/VerifyToken");

router.post(prefix,  VerifyToken, createPublicidad);

router.get(prefix,  VerifyToken, getAllPublicidad);

router.get(prefix + "/:id", VerifyToken, getPublicidadById);

router.put(prefix + "/:id",  VerifyToken, updatePublicidad);

router.delete(prefix + "/:id",  VerifyToken, deletePublicidad);

router.post(prefix + "/batch",  VerifyToken, deleteManyPublicidad);

export default router;
