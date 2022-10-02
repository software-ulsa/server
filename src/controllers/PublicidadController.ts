import { Request, Response } from "express";
import { Publicidad } from "../entities/Publicidad";

export const createPublicidad = async (req: Request, res: Response) => {
  const {
    nombre,
    dot_empresa,
    descripcion,
    email,
    url,
    fecha_inicio,
    fecha_vencimiento,
  } = req.body;
  try {
    const publicidadInsert = await Publicidad.save({
      nombre: nombre,
      dot_empresa: dot_empresa,
      descripcion: descripcion,
      email: email,
      url: url,
      fecha_inicio: new Date(fecha_inicio),
      fecha_vencimiento: new Date(fecha_vencimiento),
    });

    if (publicidadInsert)
      return res.status(200).json({ message: "Publicidad agregada" });
  } catch (error) {
    return res
      .status(404)
      .json({ error: "Hubo un error al agregar la publicidad." });
  }
};

export const getPublicidadById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const publicidadFound = await Publicidad.findOne({
    where: { id: Number(id) },
  });

  if (publicidadFound) return res.status(200).json(publicidadFound);

  return res.status(404).json({ error: "Publicidad no existe" });
};

export const getAllPublicidad = async (req: Request, res: Response) => {
  const publicidadesFound = await Publicidad.find();

  if (publicidadesFound && publicidadesFound.length > 0)
    return res.status(200).json(publicidadesFound);

  return res.status(404).json({ error: "No se encontraron coincidencias." });
};

export const updatePublicidad = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    nombre,
    dot_empresa,
    descripcion,
    email,
    url,
    fecha_inicio,
    fecha_vencimiento,
  } = req.body;

  const publicidadFound = await Publicidad.findOne({
    where: { id: Number(id) },
  });

  if (publicidadFound) {
    const publicidadUpdated = await Publicidad.update(
      {
        id: publicidadFound.id,
      },
      {
        nombre: nombre,
        dot_empresa: dot_empresa,
        descripcion: descripcion,
        email: email,
        url: url,
        fecha_inicio: new Date(fecha_inicio),
        fecha_vencimiento: new Date(fecha_vencimiento),
      }
    );

    if (publicidadUpdated.affected == 0)
      return res.status(404).json({ error: "Hubo un error al eliminar." });

    return res
      .status(200)
      .json({ message: "Publicidad eliminada correctamente." });
  }

  return res.status(404).json({ error: "Publicidad no existe" });
};

export const deletePublicidad = async (req: Request, res: Response) => {
  const { id } = req.params;
  const publicidadFound = await Publicidad.findOne({
    where: { id: Number(id) },
  });

  if (publicidadFound) {
    const publicidadDeleted = await Publicidad.delete({
      id: publicidadFound.id,
    });

    if (publicidadDeleted.affected == 0)
      return res.status(404).json({ error: "Hubo un error al eliminar." });

    return res
      .status(200)
      .json({ message: "Publicidad eliminada correctamente." });
  }

  return res.status(404).json({ error: "Publicidad no existe" });
};
