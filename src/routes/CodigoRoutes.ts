import { Router } from "express";
import { obtenerCodigo, validarCodigo } from "../controllers/CodigoController";

const prefix = "/codigo";
const router = Router();

router.get(prefix + "/:id", obtenerCodigo);

router.post(prefix + "/:id/:codigoEnviado", validarCodigo);

export default router;
