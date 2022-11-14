import { Request, Response } from "express";
import { Usuario } from "../entities/Usuario";

import * as argon2 from "argon2";
import { dataSource } from "../db.config";
import { _token } from "../constants";
import { Codigo } from "../entities/lookup/Codigo";
import { enviarCorreo } from "./EmailController";
import { In } from "typeorm";
import { Persona } from "../entities/Persona";

const jwt = require("jsonwebtoken");
const repo = dataSource.getRepository(Usuario);
require("dotenv").config();

export const createUser = async (req: Request, res: Response, next: any) => {
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
    rol_id,
    activo,
  } = req.body;
  try {
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
      activo: activo,
      rol_id: rol_id,
      persona_id: personaInsert.id,
    });

    if (usuarioInsert) {
      let payload = {
        id: usuarioInsert.id,
        correo: correo,
      };

      if (!usuarioInsert.activo) {
        const val = Math.floor(1000 + Math.random() * 9000);

        const nuevoCodigo = await Codigo.save({
          codigo: val,
          usuario_id: usuarioInsert.id,
        });

        // Aqui despues le tenemos que enviar el codigo para que se envie en el correo
        await enviarCorreo(req, res, next, val, usuarioInsert.persona.correo);
      }

      const token = jwt.sign(payload, _token);
      const userSaved = await Usuario.findOne({
        where: { id: Number(usuarioInsert.id) },
      });

      return res.status(200).send({ userSaved, token });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "Hubo un error al registrar al usuario." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const userFound = await repo
      .createQueryBuilder("user")
      .where("user.username = :username", { username: username })
      .leftJoinAndSelect("user.rol", "rol")
      .addSelect(["*"])
      .leftJoinAndSelect("user.persona", "persona")
      .addSelect(["*"])
      .addSelect("user.password")
      .getOne();

    if (!userFound) {
      return res.status(400).json({ error: "Usuario no existe." });
    }

    if (!userFound.activo) {
      return res.status(400).json({
        error: "Debes de verificar tu correo, ya te hemos enviado un correo.",
      });
    }

    const valid = await argon2.verify(userFound!.password, password);
    if (!valid) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    let payload = { id: userFound.id, correo: userFound.persona.correo };
    const token = jwt.sign(payload, _token);

    return res
      .status(200)
      .header("auth-token", token)
      .json({ userFound, token });
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userFound = await Usuario.findOne({
    where: { id: Number(id) },
  });

  if (userFound) return res.status(200).json(userFound);

  return res.status(400).json({ error: "Usuario no existe." });
};

export const getUserByRol = async (req: Request, res: Response) => {
  const { rol } = req.params;
  const usersFound = await Usuario.find({
    where: { rol_id: Number(rol) },
  });

  return res.status(200).json(usersFound);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const usersFound = await Usuario.find();
  return res.status(200).json(usersFound);
};

export const updateUser = async (req: Request, res: Response) => {
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
    rol_id,
    activo,
  } = req.body;

  const userFound = await Usuario.findOneBy({
    id: Number(id),
  });

  if (!userFound) return res.status(400).json({ error: "Usuario no existe." });

  const hashedPassword =
    password !== "" ? await argon2.hash(password) : userFound.password;

  const personaUpdate = await Persona.update(
    { id: userFound.persona_id },
    {
      nombre: nombre,
      ape_paterno: ape_paterno,
      ape_materno: ape_materno,
      fecha_nac: new Date(fecha_nac),
      sexo: sexo,
      telefono: telefono,
      correo: correo,
    }
  );

  const usuarioUpdate = await Usuario.update(
    { id: userFound.id },
    {
      username: username,
      password: hashedPassword,
      imagen: imagen,
      activo: activo,
      rol_id: rol_id,
    }
  );

  if (usuarioUpdate.affected == 0) {
    return res.status(400).json({ error: "Hubo un error al actualizar." });
  } else {
    const userUpdated = await Usuario.findOne({
      where: { id: Number(userFound.id) },
    });

    return res.status(201).json({ user: userUpdated });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userFound = await Usuario.findOneBy({
    id: Number(id),
  });

  if (userFound) {
    try {
      const userDeleted = await Usuario.delete({
        id: Number(id),
      });

      if (userDeleted.affected == 0) {
        return res.status(400).json({ error: "Hubo un error al eliminar." });
      } else {
        const personaDeleted = await Persona.delete({
          id: userFound.persona_id,
        });

        return res
          .status(200)
          .json({ id: id, message: "Usuario eliminado correctamente." });
      }
    } catch (error) {
      return res.status(400).json({ error: "Hubo un error al eliminar." });
    }
  }

  return res.send({ error: "No existe el usuario." });
};
