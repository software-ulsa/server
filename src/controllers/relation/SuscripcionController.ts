import { In } from "typeorm";
import { dataSource } from "../../db.config";
import { Request, Response } from "express";
import { Suscripcion } from "../../entities/relation/Suscripcion";

const repo = dataSource.getRepository(Suscripcion);

export const createSuscripcion = async (req: Request, res: Response) => {
  const { paciente_id, curso_id } = req.body;

  const suscripcionInsert = await Suscripcion.save({
    fecha_inicio: new Date(),
    progreso: 0,
    valoracion: 0,
    paciente_id: Number(paciente_id),
    curso_id: Number(curso_id),
  });

  if (suscripcionInsert)
    return res.status(201).json({ suscripcion: suscripcionInsert });
  return res
    .status(400)
    .json({ error: "Hubo un error al suscribirte al curso." });
};

export const getSuscriptionsByUserId = async (req: Request, res: Response) => {
  const { paciente } = req.params;
  const subsFound = await Suscripcion.find({
    where: { paciente_id: Number(paciente) },
  });

  return res.status(200).json(subsFound);
};

export const deleteSuscripcion = async (req: Request, res: Response) => {
  const { paciente, curso } = req.params;
  try {
    const subDeleted = await Suscripcion.delete({
      paciente_id: Number(paciente),
      curso_id: Number(curso),
    });

    if (subDeleted) {
      if (subDeleted.affected == 0) {
        return res
          .status(400)
          .json({ error: "Hubo un error al desuscribirte." });
      }

      return res
        .status(200)
        .json({ message: "Ya no estas inscrito al curso." });
    }
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al desuscribirte." });
  }
};
