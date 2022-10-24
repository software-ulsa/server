import { Request, Response } from "express";
import { In } from "typeorm";
import { Rol } from "../entities/Rol";

import { dataSource } from "../db.config";
const repo = dataSource.getRepository(Rol);

export const createRol = async (req: Request, res: Response) => {
  const { nombre, descripcion } = req.body;

  const rolInsert = await Rol.save({
    nombre: nombre,
    descripcion: descripcion,
  });

  if (rolInsert) return res.status(201).json({ rol: rolInsert });
  return res.status(400).json({ error: "Hubo un error al crear el rol." });
};

export const getRolById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const rolFound = await Rol.findOneBy({ id: Number(id) });

  if (rolFound) return res.status(200).json(rolFound);

  return res.status(400).json({ error: "No existe el rol." });
};

export const getAllRoles = async (req: Request, res: Response) => {
  const rolesFound = await Rol.find();
  return res.status(200).json(rolesFound);
};

export const updateRol = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  const rolFound = await Rol.findOneBy({
    id: Number(id),
  });

  if (!rolFound)
    return res.status(400).json({
      error: "Rol no existe.",
    });

  const rolUpdated = await repo
    .createQueryBuilder()
    .update({
      nombre,
      descripcion,
    })
    .where({
      id: rolFound.id,
    })
    .returning("*")
    .execute();

  if (rolUpdated.affected == 0)
    return res.status(400).json({ error: "Hubo un error al actualizar." });

  return res.status(201).json({ rol: rolUpdated.raw[0] });
};

export const deleteRol = async (req: Request, res: Response) => {
  const { id } = req.params;
  const rolFound = await Rol.findOneBy({
    id: Number(id),
  });

  if (!rolFound)
    return res.status(400).json({
      error: "Rol no existe.",
    });

  try {
    const rolDeleted = await Rol.delete({
      id: Number(id),
    });

    if (rolDeleted) {
      if (rolDeleted.affected == 0)
        return res.status(400).json({ error: "Hubo un error al eliminar." });

      return res.status(200).json({ id: id });
    }
    return res.status(400).json({ error: "Rol no existe." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};

export const deleteManyRol = async (req: Request, res: Response) => {
  const { ids } = req.body;

  try {
    const rolesDeleted = await Rol.delete({ id: In(ids) });

    if (rolesDeleted) {
      if (rolesDeleted.affected == 0)
        return res.status(400).json({ error: "Hubo un error al eliminar." });

      return res.status(200).json({ ids: ids });
    }

    return res.status(400).json({ error: "No se encontraron coincidencias." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};
