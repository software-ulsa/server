import { Router } from "express";
import {
  createRol,
  deleteManyRol,
  deleteRol,
  getAllRoles,
  getRolById,
  updateRol,
} from "../controllers/RolController";
const VerifyToken = require("../middleware/VerifyToken");

const router = Router();
const prefix = "/roles";

router.post(prefix, VerifyToken, createRol);

router.get(prefix + "/:id", VerifyToken, getRolById);

router.get(prefix, VerifyToken, getAllRoles);

router.put(prefix + "/:id", VerifyToken, updateRol);

router.delete(prefix + "/:id", VerifyToken, deleteRol);

router.post(prefix + "/batch", VerifyToken, deleteManyRol);

export default router;
