import { In } from "typeorm";
import { Request, Response } from "express";
import { dataSource } from "../../db.config";
import { Especialidad } from "../../entities/lookup/Especialidad";

const repo = dataSource.getRepository(Especialidad);

export const createEspecialidad = async (req: Request, res: Response) => {
  const { nombre, tipo } = req.body;

  const especialidadInsert = await Especialidad.save({
    nombre: nombre,
    tipo: tipo,
  });

  if (especialidadInsert)
    return res.status(201).json({ especialidad: especialidadInsert });
  return res
    .status(400)
    .json({ error: "Hubo un error al crear la especialidad." });
};

export const getEspecialidadById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const especialidadesFound = await Especialidad.findOneBy({ id: Number(id) });

  if (especialidadesFound) return res.status(200).json(especialidadesFound);

  return res.status(400).json({ error: "No existe la especialidad." });
};

export const getAllEspecialidades = async (req: Request, res: Response) => {
  const especialidadesFound = await Especialidad.find();
  return res.status(200).json(especialidadesFound);
};

export const updateEspecialidad = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, tipo } = req.body;

  const especialidadesFound = await Especialidad.findOneBy({
    id: Number(id),
  });

  if (!especialidadesFound)
    return res.status(400).json({
      error: "Especialidad no existe.",
    });

  const especialidadesUpdated = await repo
    .createQueryBuilder()
    .update({
      nombre: nombre,
      tipo: tipo,
    })
    .where({
      id: especialidadesFound.id,
    })
    .returning("*")
    .execute();

  if (especialidadesUpdated.affected == 0)
    return res.status(400).json({ error: "Hubo un error al actualizar." });

  return res.status(201).json({ especialidades: especialidadesUpdated.raw[0] });
};

export const deleteEspecialidad = async (req: Request, res: Response) => {
  const { id } = req.params;
  const especialidadesFound = await Especialidad.findOneBy({
    id: Number(id),
  });

  if (!especialidadesFound)
    return res.status(400).json({
      error: "Especialidad no existe.",
    });

  try {
    const especialidadesDeleted = await Especialidad.delete({
      id: Number(id),
    });

    if (especialidadesDeleted) {
      if (especialidadesDeleted.affected == 0)
        return res.status(400).json({ error: "Hubo un error al eliminar." });

      return res.status(200).json({ id: id });
    }
    return res.status(400).json({ error: "Especialidad no existe." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};

export const deleteManyEspecialidad = async (req: Request, res: Response) => {
  const { ids } = req.body;

  try {
    const especialidadesDeleted = await Especialidad.delete({ id: In(ids) });

    if (especialidadesDeleted) {
      if (especialidadesDeleted.affected == 0)
        return res.status(400).json({ error: "Hubo un error al eliminar." });

      return res.status(200).json({ ids: ids });
    }

    return res.status(400).json({ error: "No se encontraron coincidencias." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};
