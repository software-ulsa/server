import { Request, Response } from "express";
import { Especialista } from "../entities/Especialista";

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
      return res.status(200).json({ message: "Especialista agregado." });
  } catch (error) {
    return res
      .status(404)
      .json({ error: "Hubo un error al registrar al especialista." });
  }
};

export const getEspecialistaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const especialistaFound = await Especialista.findOne({
    where: { id: Number(id) },
  });

  if (especialistaFound) return res.status(200).json(especialistaFound);

  return res.status(404).json({ error: "Especialista no existe." });
};

export const getEspecialistaByEspecialidad = async (
  req: Request,
  res: Response
) => {
  const { especialidad } = req.params;
  const especialistasFound = await Especialista.find({
    where: { especialidad: especialidad },
  });

  if (especialistasFound && especialistasFound.length > 0)
    return res.status(200).json(especialistasFound);

  return res.status(404).json({ error: "No se encontraron coincidencias." });
};

export const getEspecialistaByArea = async (req: Request, res: Response) => {
  const { area } = req.params;
  const especialistasFound = await Especialista.find({
    where: { area_especialidad: area },
  });

  if (especialistasFound && especialistasFound.length > 0)
    return res.status(200).json(especialistasFound);

  return res.status(404).json({ error: "No se encontraron coincidencias." });
};

export const getAllEspecialista = async (req: Request, res: Response) => {
  const especialistasFound = await Especialista.find();

  if (especialistasFound && especialistasFound.length > 0)
    return res.status(200).json(especialistasFound);

  return res.status(404).json({ error: "No se encontraron coincidencias." });
};

export const updateEspecialista = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { correo, segundo_nombre } = req.body;

  const especialistaFound = await Especialista.findOne({
    where: { id: Number(id) },
  });

  if (!especialistaFound)
    return res.status(404).json({
      error: "Especialista no existe.",
    });

  const especialistaUpdated = await Especialista.update(
    { id: especialistaFound.id },
    {
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
    }
  );

  if (especialistaUpdated.affected == 0)
    return res.status(404).json({ error: "Hubo un error al actualizar." });

  return res
    .status(200)
    .json({ message: "Especialista actualizado correctamente." });
};

export const deleteEspecialista = async (req: Request, res: Response) => {
  const { id } = req.params;

  const especialistaFound = await Especialista.findOne({
    where: { id: Number(id) },
  });

  if (!especialistaFound)
    return res.status(404).json({
      error: "Especialista no existe.",
    });

  const especialistaDeleted = await Especialista.delete({
    id: especialistaFound.id,
  });

  if (especialistaDeleted.affected == 0)
    return res.status(404).json({ error: "Hubo un error al eliminar." });

  return res
    .status(200)
    .json({ message: "Especialista eliminado correctamente." });
};
