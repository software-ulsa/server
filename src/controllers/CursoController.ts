import { Request, Response } from "express";
import { Curso } from "../entities/Curso";

import { dataSource } from "../db.config";
import { In } from "typeorm";
const repo = dataSource.getRepository(Curso);

export const createCurso = async (req: Request, res: Response) => {
  try {
    const cursoInsert = await Curso.save({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      icono: req.body.icono,
    });

    if (cursoInsert) return res.status(200).json({ curso: cursoInsert });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al crear el curso." });
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

  return res.status(400).json({ error: "Curso no existe." });
};

export const getAllCurso = async (req: Request, res: Response) => {
  const cursosFound = await repo
    .createQueryBuilder("curso")
    .leftJoinAndSelect("curso.actividades", "actividad")
    .addSelect(["*"])
    .getMany();

  return res.status(200).json(cursosFound);
};

export const updateCurso = async (req: Request, res: Response) => {
  const { id } = req.params;

  const cursoFound = await Curso.findOne({
    where: { id: Number(id) },
  });

  if (!cursoFound)
    return res.status(400).json({
      error: "Curso no existe.",
    });

  const cursoUpdated = await repo
    .createQueryBuilder()
    .update({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      icono: req.body.icono,
    })
    .where({
      id: cursoFound.id,
    })
    .returning("*")
    .execute();

  if (cursoUpdated.affected == 0)
    return res.status(400).json({ error: "Hubo un error al actualizar." });

  return res.status(201).json({ curso: cursoUpdated.raw[0] });
};

export const deleteCurso = async (req: Request, res: Response) => {
  const { id } = req.params;

  const cursoFound = await Curso.findOne({
    where: { id: Number(id) },
  });

  if (!cursoFound)
    return res.status(400).json({
      error: "Curso no existe.",
    });

  try {
    const cursoDeleted = await Curso.delete({
      id: cursoFound.id,
    });

    if (cursoDeleted.affected == 0)
      return res.status(400).json({ error: "Hubo un error al eliminar." });

    return res.status(200).json({ message: "Curso eliminado correctamente." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};

export const deleteManyCurso = async (req: Request, res: Response) => {
  const { ids } = req.body;
  try {
    const cursosDeleted = await Curso.delete({ id: In(ids) });

    if (cursosDeleted) {
      if (cursosDeleted.affected == 0)
        return res.status(400).json({ error: "Hubo un error al eliminar." });

      return res
        .status(200)
        .json({ message: "Cursos eliminados correctamente." });
    }
    return res.status(400).json({ error: "No se encontraron coincidencias." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};
