import { Request, Response } from "express";
import { Rol } from "../entities/Rol";

export const createRol = async (req: Request, res: Response) => {
  const { nombre, descripcion } = req.body;

  const rolInsert = await Rol.save({
    nombre: nombre,
    descripcion: descripcion,
  });

  if (rolInsert) return res.send("Rol registrado.");
  else return res.json({ error: "Hubo un error al eliminar el Rol." });
};

export const getRolById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const rolFound = await Rol.findOneBy({ id: Number(id) });
  return res.json(rolFound);
};

export const getAllRoles = async (req: Request, res: Response) => {
  const rolesFound = await Rol.find();
  return res.json(rolesFound);
};

export const updateRol = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  const rolFound = await Rol.findOneBy({
    id: Number(id),
  });

  if (!rolFound)
    return res.json({
      success: false,
      message: "Rol no existe",
    });

  const result = await Rol.update(
    { id: Number(id) },
    {
      nombre: nombre,
      descripcion: descripcion,
    }
  );

  return res.json({
    success: result.affected === 1,
    message:
      result.affected === 1
        ? "Rol actualizado correctamente"
        : "Hubo un error al actualizar",
  });
};

export const deleteRol = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Rol.delete({
      id: Number(id),
    });
    return res.send(
      result.affected === 1
        ? "Rol eliminado"
        : "Hubo un error al eliminar el Rol"
    );
  } catch (error) {
    return res.json({ error: "Hubo un error al eliminar el Rol." });
  }
};

export const deleteAllRoles = async (req: Request, res: Response) => {
  const allRoles = await Rol.find();
  const result = await Rol.remove(allRoles);
  return res.send(
    result.length > 0 ? "Rol eliminados" : "Hubo un error al eliminar los Rol"
  );
};
