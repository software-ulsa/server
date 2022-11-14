import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserByRol,
  login,
  updateUser,
} from "../controllers/UsuarioController";
const VerifyToken = require("../middleware/VerifyToken");

const router = Router();
const prefix = "/users";

router.post(prefix, createUser);

router.post(prefix + "/login", login);

router.get(prefix + "/getById/:id", VerifyToken, getUserById);

router.get(prefix + "/getByRol/:rol", VerifyToken, getUserByRol);

router.get(prefix, VerifyToken, getAllUsers);

router.put(prefix + "/:id", VerifyToken, updateUser);

router.delete(prefix + "/:id", VerifyToken, deleteUser);

export default router;
