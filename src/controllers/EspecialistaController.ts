import * as argon2 from "argon2";
import { dataSource } from "../db.config";
import { Request, Response } from "express";

import { Especialista } from "../entities/Especialista";
import { Domicilio } from "../entities/lookup/Domicilio";
import { Persona } from "../entities/Persona";
import { Usuario } from "../entities/Usuario";
import { Rol } from "../entities/Rol";

const repo = dataSource.getRepository(Especialista);

export const createEspecialista = async (req: Request, res: Response) => {
  const {
    nombre,
    ape_paterno,
    ape_materno,
    fecha_nac,
    sexo,
    correo,
    telefono,
    calle,
    colonia,
    estado,
    codigo_postal,
    username,
    password,
    imagen,
    cedula_prof,
    especialidad_id,
  } = req.body;

  try {
    const rol = await Rol.findOne({ where: { nombre: "ESPECIALISTA" } });

    const personaInsert = await Persona.save({
      nombre: nombre,
      ape_paterno: ape_paterno,
      ape_materno: ape_materno,
      fecha_nac: new Date(fecha_nac),
      sexo: sexo,
      telefono: telefono,
      correo: correo,
    });

    const hashedPassword = await argon2.hash(password);

    const usuarioInsert = await Usuario.save({
      username: username,
      password: hashedPassword,
      imagen: imagen,
      activo: true,
      rol_id: rol!.id,
      persona_id: personaInsert.id,
    });

    const domicilioInsert = await Domicilio.save({
      calle: calle,
      colonia: colonia,
      estado: estado,
      codigo_postal: codigo_postal,
    });

    const especialistaInsert = await Especialista.save({
      cedula_prof: cedula_prof,
      domicilio_id: domicilioInsert.id,
      especialidad_id: especialidad_id,
      usuario_id: usuarioInsert.id,
    });

    if (especialistaInsert) {
      const especialistaSaved = await Especialista.findOne({
        where: { id: Number(especialistaInsert.id) },
      });

      return res.status(200).json({ especialista: especialistaSaved });
    }
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

export const getAllByEspecialidad = async (req: Request, res: Response) => {
  const { especialidad } = req.params;
  const especialistasFound = await repo.find({
    where: { especialidad: { nombre: especialidad } },
  });
  return res.status(200).json(especialistasFound);
};

export const getAllEspecialista = async (req: Request, res: Response) => {
  const especialistasFound = await repo.find();

  return res.status(200).json(especialistasFound);
};

export const updateEspecialista = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    nombre,
    ape_paterno,
    ape_materno,
    fecha_nac,
    sexo,
    telefono,
    calle,
    colonia,
    estado,
    codigo_postal,
    username,
    password,
    imagen,
    cedula_prof,
    especialidad_id,
  } = req.body;

  const especialistaFound = await repo
    .createQueryBuilder("especialista")
    .where("especialista.id = :id", { id: Number(id) })
    .leftJoinAndSelect("especialista.domicilio", "domicilio")
    .addSelect(["*"])
    .leftJoinAndSelect("especialista.especialidad", "especialidad")
    .addSelect(["*"])
    .leftJoinAndSelect("especialista.usuario", "usuario")
    .addSelect(["*"])
    .addSelect("usuario.password")
    .getOne();

  if (!especialistaFound)
    return res.status(400).json({
      error: "Especialista no existe.",
    });

  try {
    const personaUpdate = await Persona.update(
      { id: Number(especialistaFound.usuario.persona_id) },
      {
        nombre: nombre,
        ape_paterno: ape_paterno,
        ape_materno: ape_materno,
        fecha_nac: new Date(fecha_nac),
        sexo: sexo,
        telefono: telefono,
      }
    );

    const hashedPassword =
      password !== ""
        ? await argon2.hash(password)
        : especialistaFound.usuario.password;

    const usuarioUpdate = await Usuario.update(
      { id: Number(especialistaFound.usuario_id) },
      {
        username: username,
        password: hashedPassword,
        imagen: imagen,
      }
    );

    const domicilioUpdate = await Domicilio.update(
      { id: Number(especialistaFound.domicilio_id) },
      {
        calle: calle,
        colonia: colonia,
        estado: estado,
        codigo_postal: codigo_postal,
      }
    );

    const especialistaUpdate = await Especialista.update(
      { id: Number(especialistaFound.id) },
      {
        cedula_prof: cedula_prof,
        especialidad_id: especialidad_id,
      }
    );

    const especialistaUpdated = await Especialista.findOne({
      where: { id: Number(id) },
    });

    return res.status(201).json({ especialista: especialistaUpdated });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al actualizar." });
  }
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
    const especialistaDeleted = await Usuario.delete({
      id: especialistaFound.usuario_id,
    });

    if (especialistaDeleted.affected == 0) {
      return res.status(400).json({ error: "Hubo un error al eliminar." });
    } else {
      const domicilioDeleted = await Domicilio.delete({
        id: especialistaFound.domicilio_id,
      });

      const personaDeleted = await Persona.delete({
        id: especialistaFound.usuario.persona_id,
      });

      return res.status(200).json({
        id: Number(id),
        message: "Especialista eliminado correctamente.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};
