import { In } from "typeorm";
import { Request, Response } from "express";
import { dataSource } from "../db.config";
import { Curso } from "../entities/Curso";
const repo = dataSource.getRepository(Curso);

export const createCurso = async (req: Request, res: Response) => {
  const {
    titulo,
    descripcion,
    objetivo,
    fecha_inicio,
    fecha_fin,
    duracion,
    activo,
    imagen,
    palabras_clave,
    categoria_id,
  } = req.body;
  try {
    const cursoInsert = await Curso.save({
      titulo: titulo,
      descripcion: descripcion,
      objetivo: objetivo,
      fecha_inicio: new Date(fecha_inicio),
      fecha_fin: new Date(fecha_fin),
      duracion: duracion,
      activo: activo,
      imagen: imagen,
      palabras_clave: palabras_clave,
      categoria_id: categoria_id,
    });

    if (cursoInsert) {
      const newCurso = await Curso.findOne({ where: { id: cursoInsert.id } });
      return res.status(200).json({ curso: newCurso });
    }
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al crear el curso." });
  }
};

export const getCursoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const cursoFound = await Curso.findOne({ where: { id: Number(id) } });

  if (cursoFound) return res.status(200).json(cursoFound);

  return res.status(400).json({ error: "Curso no existe." });
};

export const getAllCurso = async (req: Request, res: Response) => {
  const cursosFound = await Curso.find();

  return res.status(200).json(cursosFound);
};

export const updateCurso = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    titulo,
    descripcion,
    objetivo,
    fecha_inicio,
    fecha_fin,
    duracion,
    activo,
    imagen,
    palabras_clave,
    categoria_id,
  } = req.body;

  const cursoFound = await Curso.findOne({
    where: { id: Number(id) },
  });

  if (!cursoFound) {
    return res.status(400).json({
      error: "Curso no existe.",
    });
  }

  try {
    const cursoUpdate = await Curso.update(
      { id: Number(id) },
      {
        titulo: titulo,
        descripcion: descripcion,
        objetivo: objetivo,
        fecha_inicio: new Date(fecha_inicio),
        fecha_fin: new Date(fecha_fin),
        duracion: duracion,
        activo: activo,
        imagen: imagen,
        palabras_clave: palabras_clave,
        categoria_id: categoria_id,
      }
    );

    if (cursoUpdate.affected == 0) {
      return res.status(400).json({ error: "Hubo un error al actualizar." });
    }

    const cursoUpdated = await Curso.findOne({
      where: { id: Number(id) },
    });

    return res.status(201).json({ curso: cursoUpdated });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al actualizar." });
  }
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

    return res
      .status(200)
      .json({ id: Number(id), message: "Curso eliminado correctamente." });
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
        .json({ ids: ids, message: "Cursos eliminados correctamente." });
    }
    return res.status(400).json({ error: "No se encontraron coincidencias." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};
