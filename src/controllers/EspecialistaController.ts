import { Request, Response } from "express";
import { In } from "typeorm";
import { dataSource } from "../db.config";
import { Especialista } from "../entities/Especialista";

const repo = dataSource.getRepository(Especialista);

export const createEspecialista = async (req: Request, res: Response) => {
  const { correo, segundo_nombre } = req.body;

  try {
    const especialistaInsert = await Especialista.save({
      nombre: req.body.nombre,
      segundo_nombre: segundo_nombre ? segundo_nombre : "",
      ape_paterno: req.body.ape_paterno,
      ape_materno: req.body.ape_materno,
      edad: req.body.edad,
      sexo: req.body.sexo,
      foto_especialista: req.body.foto_especialista,
      especialidad: req.body.especialidad,
      cedula: req.body.cedula,
      area_especialidad: req.body.area_especialidad,
      telefono: req.body.telefono,
      telefono_casa: req.body.telefono_casa,
      correo: correo,
    });

    if (especialistaInsert)
      return res.status(200).json({ especialista: especialistaInsert });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Hubo un error al registrar al especialista." });
  }
};

export const getEspecialistaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const especialistaFound = await Especialista.findOne({
    where: { id: Number(id) },
  });

  if (especialistaFound) return res.status(200).json(especialistaFound);

  return res.status(400).json({ error: "Especialista no existe." });
};

export const getEspecialistaByEspecialidad = async (
  req: Request,
  res: Response
) => {
  const { especialidad } = req.params;
  const especialistasFound = await Especialista.find({
    where: { especialidad: especialidad },
  });
  return res.status(200).json(especialistasFound);
};

export const getEspecialistaByArea = async (req: Request, res: Response) => {
  const { area } = req.params;
  const especialistasFound = await Especialista.find({
    where: { area_especialidad: area },
  });

  return res.status(200).json(especialistasFound);
};

export const getAllEspecialista = async (req: Request, res: Response) => {
  const especialistasFound = await Especialista.find();
  return res.status(200).json(especialistasFound);
};

export const updateEspecialista = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { correo, segundo_nombre } = req.body;

  const especialistaFound = await Especialista.findOne({
    where: { id: Number(id) },
  });

  if (!especialistaFound)
    return res.status(400).json({
      error: "Especialista no existe.",
    });

  const especialistaUpdated = await repo
    .createQueryBuilder()
    .update({
      nombre: req.body.nombre,
      segundo_nombre: segundo_nombre ? segundo_nombre : "",
      ape_paterno: req.body.ape_paterno,
      ape_materno: req.body.ape_materno,
      edad: req.body.edad,
      sexo: req.body.sexo,
      foto_especialista: req.body.foto_especialista,
      especialidad: req.body.especialidad,
      cedula: req.body.cedula,
      area_especialidad: req.body.area_especialidad,
      telefono: req.body.telefono,
      telefono_casa: req.body.telefono_casa,
      correo: correo,
    })
    .where({
      id: especialistaFound.id,
    })
    .returning("*")
    .execute();

  if (especialistaUpdated.affected == 0)
    return res.status(400).json({ error: "Hubo un error al actualizar." });

  return res.status(201).json({ especialista: especialistaUpdated.raw[0] });
};

export const deleteEspecialista = async (req: Request, res: Response) => {
  const { id } = req.params;

  const especialistaFound = await Especialista.findOne({
    where: { id: Number(id) },
  });

  if (!especialistaFound)
    return res.status(400).json({
      error: "Especialista no existe.",
    });

  try {
    const especialistaDeleted = await Especialista.delete({
      id: especialistaFound.id,
    });

    if (especialistaDeleted.affected == 0)
      return res.status(400).json({ error: "Hubo un error al eliminar." });

    return res
      .status(200)
      .json({ message: "Especialista eliminado correctamente." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};

export const deleteManyEspecialista = async (req: Request, res: Response) => {
  const { ids } = req.body;

  try {
    const especialistasDeleted = await Especialista.delete({ id: In(ids) });

    if (especialistasDeleted) {
      if (especialistasDeleted.affected == 0)
        return res.status(400).json({ error: "Hubo un error al eliminar." });

      return res
        .status(200)
        .json({ message: "Especialista eliminados correctamente." });
    }
    return res.status(400).json({ error: "No se encontraron coincidencias." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};
