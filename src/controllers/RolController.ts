import { Request, Response } from "express";
import { Rol } from "../entities/Rol";

export const createRol = async (req: Request, res: Response) => {
  const { nombre, descripcion } = req.body;

  const rolInsert = await Rol.save({
    nombre: nombre,
    descripcion: descripcion,
  });

  if (rolInsert) return res.status(200).json({ message: "Rol agregado." });
  return res.status(404).json({ error: "Hubo un error al crear el rol." });
};

export const getRolById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const rolFound = await Rol.findOneBy({ id: Number(id) });

  if (rolFound) return res.status(200).json(rolFound);

  return res.status(404).json({ error: "No existe el rol." });
};

export const getAllRoles = async (req: Request, res: Response) => {
  const rolesFound = await Rol.find();

  if (rolesFound && rolesFound.length > 0)
    return res.status(200).json(rolesFound);

  return res.status(404).json({ error: "No se encontraron coincidencias." });
};

export const updateRol = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  const rolFound = await Rol.findOneBy({
    id: Number(id),
  });

  if (!rolFound)
    return res.status(404).json({
      message: "Rol no existe.",
    });

  const rolUpdated = await Rol.update(
    { id: Number(id) },
    {
      nombre: nombre,
      descripcion: descripcion,
    }
  );

  if (rolUpdated.affected == 0)
    return res.status(404).json({ error: "Hubo un error al actualizar." });

  return res.status(200).json({ message: "Rol actualizado correctamente." });
};

export const deleteRol = async (req: Request, res: Response) => {
  const { id } = req.params;
  const rolDeleted = await Rol.delete({
    id: Number(id),
  });

  if (rolDeleted) {
    if (rolDeleted.affected == 0)
      return res.status(404).json({ error: "Hubo un error al actualizar." });

    return res.status(200).json({ message: "Rol eliminado correctamente." });
  }
  return res.status(404).json({ error: "Rol no existe." });
};
