import { Request, Response } from "express";
import { Curso } from "../entities/Curso";

import { dataSource } from "../db.config";
const repo = dataSource.getRepository(Curso);

export const createCurso = async (req: Request, res: Response) => {
  try {
    const cursoInsert = await Curso.save({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
    });

    if (cursoInsert) return res.status(200).json({ message: "Curso creado." });
  } catch (error) {
    return res.status(404).json({ error: "Hubo un error al crear el curso." });
  }
};

export const getCursoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const cursoFound = await repo
    .createQueryBuilder("curso")
    .where("curso.id = :id", { id: Number(id) })
    .leftJoinAndSelect("curso.actividades", "actividad")
    .addSelect(["*"])
    .getOne();

  if (cursoFound) return res.status(200).json(cursoFound);

  return res.status(404).json({ error: "Curso no existe." });
};

export const getAllCurso = async (req: Request, res: Response) => {
  const cursosFound = await repo
    .createQueryBuilder("curso")
    .leftJoinAndSelect("curso.actividades", "actividad")
    .addSelect(["*"])
    .getMany();

  if (cursosFound && cursosFound.length > 0)
    return res.status(200).json(cursosFound);

  return res.status(404).json({ error: "No se encontraron coincidencias." });
};

export const updateCurso = async (req: Request, res: Response) => {
  const { id } = req.params;

  const cursoFound = await Curso.findOne({
    where: { id: Number(id) },
  });

  if (!cursoFound)
    return res.status(404).json({
      error: "Curso no existe.",
    });

  const cursoUpdated = await Curso.update(
    {
      id: cursoFound.id,
    },
    {
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
    }
  );

  if (cursoUpdated.affected == 0)
    return res.status(404).json({ error: "Hubo un error al actualizar." });

  return res.status(200).json({ message: "Curso actualizado correctamente." });
};

export const deleteCurso = async (req: Request, res: Response) => {
  const { id } = req.params;

  const cursoFound = await Curso.findOne({
    where: { id: Number(id) },
  });

  if (!cursoFound)
    return res.status(404).json({
      error: "Curso no existe.",
    });

  const cursoDeleted = await Curso.delete({
    id: cursoFound.id,
  });

  if (cursoDeleted.affected == 0)
    return res.status(404).json({ error: "Hubo un error al eliminar." });

  return res.status(200).json({ message: "Curso eliminado correctamente." });
};
