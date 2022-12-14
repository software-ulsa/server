import { In, Like } from "typeorm";
import { dataSource } from "../db.config";
import { Request, Response } from "express";
import { Nota } from "../entities/Nota";

const repo = dataSource.getRepository(Nota);
require("dotenv").config();

export const createNota = async (req: Request, res: Response) => {
  const {
    titulo,
    tema,
    contenido,
    estado,
    imagen,
    palabras_clave,
    usuario_id,
  } = req.body;
  try {
    const notaInsert = await Nota.save({
      titulo: titulo,
      contenido: contenido,
      imagen: imagen,
      estado: estado,
      tema: tema,
      palabras_clave: palabras_clave,
      usuario_id: usuario_id,
    });

    if (notaInsert) return res.status(200).json({ nota: notaInsert });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Hubo un error al registrar la nota." });
  }
};

export const getNotaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const notaFound = await Nota.findOne({ where: { id: Number(id) } });

  if (notaFound) return res.status(200).json(notaFound);

  return res.status(400).json({ error: "Nota no existe." });
};

export const getNotaByKeyword = async (req: Request, res: Response) => {
  const { palabras_clave } = req.body;

  const notasFound = await repo
    .createQueryBuilder("nota")
    .where("nota.palabras_clave IN (:palabras_clave)", {
      palabras_clave: palabras_clave,
    })
    .getMany();

  return res.status(200).json(notasFound);
};

export const getAllNotas = async (req: Request, res: Response) => {
  const notasFound = await Nota.find();

  return res.status(200).json(notasFound);
};

export const getAllByUsuarioId = async (req: Request, res: Response) => {
  const { usuario_id } = req.params;
  const notasFound = await Nota.find({
    where: { usuario_id: Number(usuario_id) },
  });

  return res.status(200).json(notasFound);
};

export const updateNota = async (req: Request, res: Response) => {
  const { id } = req.params;

  const notaFound = await Nota.findOneBy({
    id: Number(id),
  });

  if (!notaFound)
    return res.status(400).json({
      error: "Nota no existe.",
    });

  try {
    const notaUpdated = await Nota.update({ id: parseInt(id) }, req.body);

    if (notaUpdated.affected == 0)
      return res.status(400).json({ error: "Hubo un error al actualizar." });

    const notaActualizada = await Nota.findOne({
      where: { id: Number(id) },
    });

    return res.status(201).json({ nota: notaActualizada });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al editar la nota." });
  }
};

export const acceptNota = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const notaUpdated = await Nota.update(
      { id: parseInt(id) },
      { estado: "Aceptado" }
    );
    const notaActualizada = await Nota.findOne({
      where: { id: Number(id) },
    });

    return res.status(201).json({ nota: notaActualizada });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al editar la nota." });
  }
};

export const rejectNota = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const notaUpdated = await Nota.update(
      { id: parseInt(id) },
      { estado: "Rechazado" }
    );
    const notaActualizada = await Nota.findOne({
      where: { id: Number(id) },
    });

    return res.status(201).json({ nota: notaActualizada });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al editar la nota." });
  }
};

export const deleteNota = async (req: Request, res: Response) => {
  const { id } = req.params;
  const notaFound = await Nota.findOneBy({
    id: Number(id),
  });

  if (!notaFound)
    return res.status(400).json({
      error: "Nota no existe",
    });

  try {
    const notaDeleted = await Nota.delete({ id: notaFound.id });
    if (notaDeleted.affected == 0)
      return res.status(400).json({ error: "Hubo un error al eliminar." });

    return res
      .status(200)
      .json({ id: Number(id), message: "Nota eliminada correctamente." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};

export const deleteManyNota = async (req: Request, res: Response) => {
  const { ids } = req.body;
  try {
    const notasDeleted = await Nota.delete({ id: In(ids) });

    if (notasDeleted) {
      if (notasDeleted.affected == 0)
        return res.status(400).json({ error: "Hubo un error al eliminar." });

      return res
        .status(200)
        .json({ ids: ids, message: "Notas eliminadas correctamente." });
    }
    return res.status(400).json({ error: "No se encontraron coincidencias." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};

export const getActiveNotas = async (req: Request, res: Response) => {
  try {
    const data = await Nota.findBy({ estado: "Aceptado" });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error." });
  }
};

export const getNotesByFilter = async (req: Request, res: Response) => {
  try {
    let word = req.query.word;

    let data = undefined;
    /^\s*$/.test(String(word))
      ? (data = await Nota.findBy({ estado: "Aceptado" }))
      : (data = await Nota.findBy({
          titulo: Like(`%${word}%`),
          estado: "Aceptado",
        }));

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error." });
  }
};
