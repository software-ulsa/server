import { Request, Response } from "express";
import { Codigo } from "../entities/Codigo";

import { dataSource } from "../db.config";
import { Usuario } from "../entities/Usuario";
const repo = dataSource.getRepository(Codigo);

export const obtenerCodigo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const codigoFound = await repo
      .createQueryBuilder("codigo")
      .where("codigo.id_user = :id", { id: Number(id) })
      .getOne();

    if (codigoFound) return res.status(200).json(codigoFound);

    return res.status(404).json({ error: "El codigo no existe." });
  } catch (error) {
    return res
      .status(404)
      .json({ error: "Hubo un error al tratar de recuperar el codigo." });
  }
};

export const validarCodigo = async (req: Request, res: Response) => {
  try {
    const { id, codigoEnviado } = req.params;
    const codigoFound = await repo
      .createQueryBuilder("codigo")
      .where("codigo.id_user = :id", { id: Number(id) })
      .getOne();

    if (codigoFound) {
      if (codigoFound?.codigo == Number(codigoEnviado)) {
        await Usuario.update(
          { id: codigoFound.id_user },
          {
            activo: true,
          }
        );

        return res.status(200).json({ mensaje: "Cuenta verificada!." });
      } else {
        return res.status(200).json({ mensaje: "Codigo incorrecto." });
      }
    }

    return res.status(404).json({ error: "El codigo no existe." });
  } catch (error) {
    return res
      .status(404)
      .json({ error: "Hubo un error al tratar de recuperar el codigo." });
  }
};
