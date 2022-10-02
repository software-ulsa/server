import { Request, Response } from "express";

import { dataSource } from "../db.config";
import { Actividad } from "../entities/Actividad";
const repo = dataSource.getRepository(Actividad);

export const createActividad = async (req: Request, res: Response) => {
  try {
    const actividadInsert = await Actividad.save({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      url_media: req.body.url_media,
      peso: req.body.peso,
    });

    if (actividadInsert)
      return res.status(200).json({ message: "Actividad agregada." });
  } catch (error) {
    return res
      .status(404)
      .json({ error: "Hubo un error al agregar la actividad." });
  }
};

export const getActividadById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const actividadFound = await Actividad.findOne({ where: { id: Number(id) } });

  if (actividadFound) return res.status(200).json(actividadFound);

  return res.status(404).json({ error: "Actividad no existe." });
};

export const getAllActividad = async (req: Request, res: Response) => {
  const actividadesFound = await Actividad.find();

  if (actividadesFound && actividadesFound.length > 0)
    return res.status(200).json(actividadesFound);

  return res.status(404).json({ error: "No se encontraron coincidencias." });
};

export const updateActividad = async (req: Request, res: Response) => {
  const { id } = req.params;

  const actividadFound = await Actividad.findOne({
    where: { id: Number(id) },
  });

  if (!actividadFound)
    return res.status(404).json({
      error: "Actividad no existe.",
    });

  const actividadUpdated = await Actividad.update(
    {
      id: actividadFound.id,
    },
    {
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      url_media: req.body.url_media,
      peso: req.body.peso,
    }
  );

  if (actividadUpdated.affected == 0)
    return res.status(404).json({ error: "Hubo un error al actualizar." });

  return res
    .status(200)
    .json({ message: "Actividad actualizada correctamente." });
};

export const deleteActividad = async (req: Request, res: Response) => {
  const { id } = req.params;

  const actividadFound = await Actividad.findOne({
    where: { id: Number(id) },
  });

  if (!actividadFound)
    return res.status(404).json({
      error: "Actividad no existe.",
    });

  const actividadDeleted = await Actividad.delete({
    id: actividadFound.id,
  });

  if (actividadDeleted.affected == 0)
    return res.status(404).json({ error: "Hubo un error al eliminar." });

  return res
    .status(200)
    .json({ message: "Actividad eliminada correctamente." });
};
