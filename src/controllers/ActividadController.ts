import { In } from "typeorm";
import { dataSource } from "../db.config";
import { Request, Response } from "express";
import { Actividad } from "../entities/Actividad";
const repo = dataSource.getRepository(Actividad);

export const createActividad = async (req: Request, res: Response) => {
  const { titulo, descripcion, url_media, curso_id } = req.body;
  try {
    const actividadInsert = await Actividad.save({
      titulo: titulo,
      descripcion: descripcion,
      url_media: url_media,
      curso_id: curso_id,
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

export const getAllActividadByCursoId = async (req: Request, res: Response) => {
  const { curso_id } = req.params;
  const actividadesFound = Actividad.find({
    where: { curso_id: Number(curso_id) },
  });

  return res.status(200).json(actividadesFound);
};

export const updateActividad = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { titulo, descripcion, url_media, curso_id } = req.body;

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
      titulo: titulo,
      descripcion: descripcion,
      url_media: url_media,
      curso_id: curso_id,
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
      .json({ id: Number(id), message: "Actividad eliminada correctamente." });
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
        .json({ ids: ids, message: "Actividades eliminadas correctamente." });
    }
    return res.status(400).json({ error: "No se encontraron coincidencias." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};
