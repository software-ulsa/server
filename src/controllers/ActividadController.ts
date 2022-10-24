import { Request, Response } from "express";
import { In } from "typeorm";

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
      id_curso: req.body.id_curso,
    });

    if (actividadInsert)
      return res.status(200).json({ actividad: actividadInsert });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Hubo un error al agregar la actividad." });
  }
};

export const getActividadById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const actividadFound = await Actividad.findOne({ where: { id: Number(id) } });

  if (actividadFound) return res.status(200).json(actividadFound);

  return res.status(400).json({ error: "Actividad no existe." });
};

export const getAllActividad = async (req: Request, res: Response) => {
  const actividadesFound = await Actividad.find();
  return res.status(200).json(actividadesFound);
};

export const updateActividad = async (req: Request, res: Response) => {
  const { id } = req.params;

  const actividadFound = await Actividad.findOne({
    where: { id: Number(id) },
  });

  if (!actividadFound)
    return res.status(400).json({
      error: "Actividad no existe.",
    });

  const actividadUpdated = await repo
    .createQueryBuilder()
    .update({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      url_media: req.body.url_media,
      peso: req.body.peso,
      id_curso: req.body.id_curso,
    })
    .where({
      id: actividadFound.id,
    })
    .returning("*")
    .execute();

  if (actividadUpdated.affected == 0)
    return res.status(400).json({ error: "Hubo un error al actualizar." });

  return res.status(201).json({ actividadUpdated: actividadUpdated.raw[0] });
};

export const deleteActividad = async (req: Request, res: Response) => {
  const { id } = req.params;

  const actividadFound = await Actividad.findOne({
    where: { id: Number(id) },
  });

  if (!actividadFound)
    return res.status(400).json({
      error: "Actividad no existe.",
    });
  try {
    const actividadDeleted = await Actividad.delete({
      id: actividadFound.id,
    });

    if (actividadDeleted.affected == 0)
      return res.status(400).json({ error: "Hubo un error al eliminar." });

    return res
      .status(200)
      .json({ message: "Actividad eliminada correctamente." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};

export const deleteManyActividad = async (req: Request, res: Response) => {
  const { ids } = req.body;
  try {
    const actividadesDeleted = await Actividad.delete({ id: In(ids) });

    if (actividadesDeleted) {
      if (actividadesDeleted.affected == 0)
        return res.status(400).json({ error: "Hubo un error al eliminar." });

      return res
        .status(200)
        .json({ message: "Actividades eliminadas correctamente." });
    }
    return res.status(400).json({ error: "No se encontraron coincidencias." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};
