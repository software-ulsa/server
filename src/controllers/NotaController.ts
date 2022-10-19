import { Request, Response } from "express";
import { In } from "typeorm";

import { dataSource } from "../db.config";
import { Nota } from "../entities/Nota";

const repo = dataSource.getRepository(Nota);
require("dotenv").config();

export const createNota = async (req: Request, res: Response) => {
  const {
    titulo,
    tema,
    foto_thumbnail,
    foto_principal,
    contenido,
    palabras_clave,
  } = req.body;
  try {
    const notaInsert = await Nota.save({
      titulo: titulo,
      tema: tema,
      foto_thumbnail: foto_thumbnail,
      foto_principal: foto_principal,
      contenido: contenido,
      palabras_clave: palabras_clave,
    });

    if (notaInsert) return res.status(200).json({ message: "Nota agregada." });
  } catch (error) {
    return res
      .status(404)
      .json({ error: "Hubo un error al registrar la nota." });
  }
};

export const getNotaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const notaFound = await Nota.findOne({ where: { id: Number(id) } });

  if (notaFound) return res.status(200).json(notaFound);

  return res.status(404).json({ error: "Nota no existe." });
};

export const getNotaByKeyword = async (req: Request, res: Response) => {
  const { palabras_clave } = req.body;
  const notasFound = await repo
    .createQueryBuilder("nota")
    .where("nota.palabras_clave IN (:palabras_clave)", {
      palabras_clave: palabras_clave,
    })
    .getMany();

  if (notasFound && notasFound.length > 0)
    return res.status(200).json(notasFound);

  return res.status(404).json({ error: "No se encontraron coincidencias." });
};

export const getAllNotas = async (req: Request, res: Response) => {
  const notasFound = await Nota.find();

  if (notasFound && notasFound.length > 0)
    return res.status(200).json(notasFound);

  return res.status(404).json({ error: "No se encontraron coincidencias." });
};

export const updateNota = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    titulo,
    tema,
    foto_thumbnail,
    foto_principal,
    contenido,
    palabras_clave,
  } = req.body;

  const notaFound = await Nota.findOneBy({
    id: Number(id),
  });

  if (!notaFound)
    return res.status(404).json({
      error: "Nota no existe.",
    });

  const notaUpdated = await Nota.update(
    { id: notaFound.id },
    {
      titulo: titulo,
      tema: tema,
      foto_thumbnail: foto_thumbnail,
      foto_principal: foto_principal,
      contenido: contenido,
      palabras_clave: palabras_clave,
    }
  );

  if (notaUpdated.affected == 0)
    return res.status(404).json({ error: "Hubo un error al actualizar." });

  return res.status(200).json({ message: "Nota actualizada correctamente." });
};

export const deleteNota = async (req: Request, res: Response) => {
  const { id } = req.params;
  const notaFound = await Nota.findOneBy({
    id: Number(id),
  });

  if (!notaFound)
    return res.status(404).json({
      error: "Nota no existe",
    });

  const notaDeleted = await Nota.delete({ id: notaFound.id });
  if (notaDeleted.affected == 0)
    return res.status(404).json({ error: "Hubo un error al eliminar." });

  return res.status(200).json({ message: "Nota eliminada correctamente." });
};

export const deleteManyNota = async (req: Request, res: Response) => {
  const { ids } = req.body;
  const notasDeleted = await Nota.delete({ id: In(ids) });

  if (notasDeleted) {
    if (notasDeleted.affected == 0)
      return res.status(404).json({ error: "Hubo un error al eliminar." });

    return res.status(200).json({ message: "Notas eliminadas correctamente." });
  }
  return res.status(404).json({ error: "No se encontraron coincidencias." });
};
