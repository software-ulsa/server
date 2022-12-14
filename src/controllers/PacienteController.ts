import { enviarCorreo } from "./EmailController";
import * as argon2 from "argon2";
import { dataSource } from "../db.config";
import { NextFunction, Request, Response } from "express";
import { _token } from "../constants";
import { Domicilio } from "../entities/lookup/Domicilio";
import { Persona } from "../entities/Persona";
import { Usuario } from "../entities/Usuario";
import { Paciente } from "../entities/Paciente";
import { Rol } from "../entities/Rol";
import { Codigo } from "../entities/lookup/Codigo";
const jwt = require("jsonwebtoken");

const repo = dataSource.getRepository(Paciente);

export const registerPaciente = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    nombre,
    ape_paterno,
    ape_materno,
    fecha_nac,
    sexo,
    correo,
    telefono,
    username,
    password,
    imagen,
    matricula,
    carrera_id,
  } = req.body;

  try {
    const rol = await Rol.findOne({ where: { nombre: "PACIENTE" } });

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
      activo: false,
      rol_id: rol!.id,
      persona_id: personaInsert.id,
    });

    if (usuarioInsert) {
      const val = Math.floor(1000 + Math.random() * 9000);

      await Codigo.save({
        codigo: val,
        usuario_id: usuarioInsert.id,
      });

      const pacienteInsert = await Paciente.save({
        usuario_id: usuarioInsert.id,
        carrera_id: carrera_id,
        matricula: matricula,
      });

      if (pacienteInsert) {
        const pacienteSaved = await Paciente.findOne({
          where: { id: Number(pacienteInsert.id) },
        });

        return res.status(200).json({ paciente: pacienteSaved });
      }
    }
    const val = Math.floor(1000 + Math.random() * 9000);

    await Codigo.save({
      codigo: val,
      usuario_id: usuarioInsert.id,
    });

    await enviarCorreo(req, res, next, val, correo);

    let payload = {
      id: usuarioInsert.id,
      correo: correo,
    };
    const token = jwt.sign(payload, _token);
    const data = { ...usuarioInsert, persona: personaInsert };
    return res.status(200).json({ usuarioInsert: data, token });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Hubo un error al registrar al paciente." });
  }
};

export const createPaciente = async (req: Request, res: Response) => {
  const {
    nombre,
    ape_paterno,
    ape_materno,
    fecha_nac,
    sexo,
    correo,
    telefono,
    username,
    password,
    imagen,
    matricula,
    carrera_id,
  } = req.body;
  console.log(req.body);
  try {
    const rol = await Rol.findOne({ where: { nombre: "PACIENTE" } });

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

    const pacienteInsert = await Paciente.save({
      usuario_id: usuarioInsert.id,
      carrera_id: carrera_id,
      matricula: matricula,
    });

    if (pacienteInsert) {
      const userSaved = await Paciente.findOne({
        where: { id: Number(pacienteInsert.id) },
      });

      return res.status(200).json({ paciente: userSaved });
    }
    return res
      .status(400)
      .json({ error: "Hubo un error al registrar al paciente." });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "Hubo un error al registrar al paciente." });
  }
};

export const getPacienteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const pacienteFound = await Paciente.findOne({
    where: { id: Number(id) },
  });

  if (pacienteFound) return res.status(200).json(pacienteFound);

  return res.status(400).json({ error: "Paciente no existe." });
};

export const getAllByCarrera = async (req: Request, res: Response) => {
  const { carrera } = req.params;
  const pacientesFound = await repo.find({
    where: { carrera: { nombre: carrera } },
  });
  return res.status(200).json(pacientesFound);
};

export const getAllPaciente = async (req: Request, res: Response) => {
  const pacientesFound = await repo.find();

  return res.status(200).json(pacientesFound);
};

export const updatePaciente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    nombre,
    ape_paterno,
    ape_materno,
    fecha_nac,
    sexo,
    correo,
    telefono,
    username,
    password,
    imagen,
    matricula,
    carrera_id,
    activo,
  } = req.body;

  const pacienteFound = await repo
    .createQueryBuilder("paciente")
    .where("paciente.id = :id", { id: Number(id) })
    .leftJoinAndSelect("paciente.carrera", "carrera")
    .addSelect(["*"])
    .leftJoinAndSelect("paciente.usuario", "usuario")
    .addSelect(["*"])
    .addSelect("usuario.password")
    .getOne();

  console.log(pacienteFound);
  if (!pacienteFound)
    return res.status(400).json({
      error: "Paciente no existe.",
    });

  try {
    const personaUpdate = await Persona.update(
      { id: Number(pacienteFound.usuario.persona_id) },
      {
        nombre: nombre,
        ape_paterno: ape_paterno,
        ape_materno: ape_materno,
        fecha_nac: new Date(fecha_nac),
        sexo: sexo,
        telefono: telefono,
        // correo: correo,
      }
    );

    const hashedPassword = password
      ? await argon2.hash(password)
      : pacienteFound.usuario.password;

    const usuarioUpdate = await Usuario.update(
      { id: Number(pacienteFound.usuario_id) },
      {
        username: username,
        password: hashedPassword,
        imagen: imagen,
        activo: activo,
      }
    );
    const pacienteUpdate = await Paciente.update(
      { id: Number(pacienteFound.id) },
      {
        carrera_id: carrera_id,
        matricula: matricula,
      }
    );

    const pacienteUpdated = await Paciente.findOne({
      where: { id: Number(id) },
    });
    console.log(pacienteUpdated);
    return res.status(201).json({ paciente: pacienteUpdated });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Hubo un error al actualizar." });
  }
};

export const deletePaciente = async (req: Request, res: Response) => {
  const { id } = req.params;

  const pacienteFound = await Paciente.findOne({
    where: { id: Number(id) },
  });

  if (!pacienteFound)
    return res.status(400).json({
      error: "Paciente no existe.",
    });

  try {
    const pacienteDeleted = await Usuario.delete({
      id: pacienteFound.usuario_id,
    });

    if (pacienteDeleted.affected == 0) {
      return res.status(400).json({ error: "Hubo un error al eliminar." });
    } else {
      const personaDeleted = await Persona.delete({
        id: pacienteFound.usuario.persona_id,
      });

      return res.status(200).json({
        id: Number(id),
        message: "Paciente eliminado correctamente.",
      });
    }
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};
