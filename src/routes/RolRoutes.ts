import { Router } from "express";
import {
  createRol,
  deleteRol,
  getAllRoles,
  getRolById,
  updateRol,
} from "../controllers/RolController";
const VerifyToken = require("../Middleware/VerifyToken");

const router = Router();
const prefix = "/roles";

router.post(prefix, VerifyToken, createRol);

router.get(prefix + "/:id", VerifyToken, getRolById);

router.get(prefix, VerifyToken, getAllRoles);

router.put(prefix + "/:id", VerifyToken, updateRol);

router.delete(prefix + "/:id", VerifyToken, deleteRol);

export default router;
