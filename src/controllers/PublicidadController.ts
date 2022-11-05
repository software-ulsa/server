import { In } from "typeorm";
import { dataSource } from "../db.config";
import { Request, Response } from "express";
import { Publicidad } from "../entities/Publicidad";

const repo = dataSource.getRepository(Publicidad);

export const createPublicidad = async (req: Request, res: Response) => {
  const {
    nombre,
    descripcion,
    empresa,
    correo_empresa,
    url_empresa,
    fecha_inicio,
    fecha_fin,
    imagen,
  } = req.body;
  try {
    const publicidadInsert = await Publicidad.save({
      nombre: nombre,
      descripcion: descripcion,
      empresa: empresa,
      correo_empresa: correo_empresa,
      url_empresa: url_empresa,
      imagen: imagen,
      fecha_inicio: new Date(fecha_inicio),
      fecha_fin: new Date(fecha_fin),
    });

    if (publicidadInsert) return res.status(200).json({ publicidad: publicidadInsert });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Hubo un error al agregar la publicidad." });
  }
};

export const getPublicidadById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const publicidadFound = await Publicidad.findOne({
      where: { id: Number(id) },
    });

    if (publicidadFound) return res.status(200).json(publicidadFound);

    return res.status(400).json({ error: "Publicidad no existe" });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al agregar la publicidad." });
  }
};

export const getAllPublicidad = async (req: Request, res: Response) => {
  try {
    const publicidadesFound = await Publicidad.find();

    if (publicidadesFound && publicidadesFound.length > 0)
      return res.status(200).json(publicidadesFound);

    return res.status(400).json({ error: "No se encontraron coincidencias." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al agregar la publicidad." });
  }
};

export const updatePublicidad = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const publicidadFound = await Publicidad.findOne({
      where: { id: Number(id) },
    });

    if (publicidadFound) {
      const publicidadUpdated = await Publicidad.update({ id: parseInt(id) }, req.body);

      if (publicidadUpdated.affected == 0)
        return res.status(400).json({ error: "Hubo un error al actualizar." });

      const publicidadActualizada = await Publicidad.findOne({
        where: { id: Number(id) },
      });
      return res.status(201).json({ publicidad: publicidadActualizada });
    }

    return res.status(400).json({ error: "Publicidad no existe" });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al actualizar la publicidad." });
  }
};

export const deletePublicidad = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const publicidadFound = await Publicidad.findOne({
      where: { id: Number(id) },
    });

    if (publicidadFound) {
      try {
        const publicidadDeleted = await Publicidad.delete({
          id: publicidadFound.id,
        });

        if (publicidadDeleted.affected == 0)
          return res.status(400).json({ error: "Hubo un error al eliminar." });

        return res.status(200).json({
          id: Number(id),
          message: "Publicidad eliminada correctamente.",
        });
      } catch (error) {
        return res.status(400).json({ error: "Hubo un error al eliminar." });
      }
    }

    return res.status(400).json({ error: "Publicidad no existe" });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al agregar la publicidad." });
  }
};

export const deleteManyPublicidad = async (req: Request, res: Response) => {
  const { ids } = req.body;
  try {
    const publicidadesDeleted = await Publicidad.delete({ id: In(ids) });

    if (publicidadesDeleted) {
      if (publicidadesDeleted.affected == 0)
        return res.status(400).json({ error: "Hubo un error al eliminar." });

      return res.status(200).json({ ids: ids, message: "Publicidades eliminadas correctamente." });
    }
    return res.status(400).json({ error: "No se encontraron coincidencias." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};
