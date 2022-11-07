import { In } from "typeorm";
import { Request, Response } from "express";
import { dataSource } from "../../db.config";
import { Carrera } from "../../entities/lookup/Carrera";

const repo = dataSource.getRepository(Carrera);

export const createCarrera = async (req: Request, res: Response) => {
  const { nombre, abreviatura } = req.body;

  const carreraInsert = await Carrera.save({
    nombre: nombre,
    abreviatura: abreviatura,
  });

  if (carreraInsert) return res.status(201).json({ carrera: carreraInsert });
  return res.status(400).json({ error: "Hubo un error al crear la carrera." });
};

export const getCarreraById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const carrerasFound = await Carrera.findOneBy({ id: Number(id) });

  if (carrerasFound) return res.status(200).json(carrerasFound);

  return res.status(400).json({ error: "No existe la carrera." });
};

export const getAllCarreras = async (req: Request, res: Response) => {
  const carrerasFound = await Carrera.find();
  return res.status(200).json(carrerasFound);
};

export const updateCarrera = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, abreviatura } = req.body;

  const carrerasFound = await Carrera.findOneBy({
    id: Number(id),
  });

  if (!carrerasFound)
    return res.status(400).json({
      error: "Carrera no existe.",
    });

  const carrerasUpdated = await repo
    .createQueryBuilder()
    .update({
      nombre: nombre,
      abreviatura: abreviatura,
    })
    .where({
      id: carrerasFound.id,
    })
    .returning("*")
    .execute();

  if (carrerasUpdated.affected == 0)
    return res.status(400).json({ error: "Hubo un error al actualizar." });

  return res.status(201).json({ carrera: carrerasUpdated.raw[0] });
};

export const deleteCarrera = async (req: Request, res: Response) => {
  const { id } = req.params;
  const carrerasFound = await Carrera.findOneBy({
    id: Number(id),
  });

  if (!carrerasFound)
    return res.status(400).json({
      error: "Carrera no existe.",
    });

  try {
    const carrerasDeleted = await Carrera.delete({
      id: Number(id),
    });

    if (carrerasDeleted) {
      if (carrerasDeleted.affected == 0)
        return res.status(400).json({ error: "Hubo un error al eliminar." });

      return res.status(200).json({ id: id });
    }
    return res.status(400).json({ error: "Carrera no existe." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};

export const deleteManyCarrera = async (req: Request, res: Response) => {
  const { ids } = req.body;

  try {
    const carrerasDeleted = await Carrera.delete({ id: In(ids) });

    if (carrerasDeleted) {
      if (carrerasDeleted.affected == 0)
        return res.status(400).json({ error: "Hubo un error al eliminar." });

      return res.status(200).json({ ids: ids });
    }

    return res.status(400).json({ error: "No se encontraron coincidencias." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};
