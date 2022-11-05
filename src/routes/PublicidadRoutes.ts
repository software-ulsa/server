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

router.post(prefix,  createPublicidad);

router.get(prefix,  getAllPublicidad);

router.get(prefix + "/:id", getPublicidadById);

router.put(prefix + "/:id",  updatePublicidad);

router.delete(prefix + "/:id",  deletePublicidad);

router.post(prefix + "/batch",  deleteManyPublicidad);

export default router;
