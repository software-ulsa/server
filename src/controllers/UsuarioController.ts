import { Request, Response } from "express";
import { Usuario } from "../entities/Usuario";

import * as argon2 from "argon2";
import { dataSource } from "../db.config";
import { _token } from "../constants";
import { Codigo } from "../entities/lookup/Codigo";
import { enviarCorreo } from "./EmailController";
import { In } from "typeorm";

const jwt = require("jsonwebtoken");
const repo = dataSource.getRepository(Usuario);
require("dotenv").config();

export const createUser = async (req: Request, res: Response, next: any) => {
  const { segundo_nombre, correo, password } = req.body;

  const hashedPassword = await argon2.hash(password);
  try {
    const userInsert = await Usuario.save({
      foto_perfil: req.body.foto_perfil,
      nombre: req.body.nombre,
      segundo_nombre: segundo_nombre ? segundo_nombre : "",
      ape_paterno: req.body.ape_paterno,
      ape_materno: req.body.ape_materno,
      correo: correo,
      password: hashedPassword,
      telefono: req.body.telefono,
      edad: req.body.edad,
      matricula: req.body.matricula,
      sexo: req.body.sexo,
      id_rol: req.body.id_rol,
      activo: req.body.activo,
    });

    if (userInsert) {
      let payload = {
        id: userInsert.id,
        correo: correo,
      };

      if (!userInsert.activo) {
        const val = Math.floor(1000 + Math.random() * 9000);

        const nuevoCodigo = await Codigo.save({
          id_user: userInsert.id,
          codigo: val,
        });

        // Aqui despues le tenemos que enviar el codigo para que se envie en el correo
        await enviarCorreo(req, res, next, val, userInsert.correo);
      }

      const token = jwt.sign(payload, _token);
      const userSaved = await repo
        .createQueryBuilder("user")
        .where("user.id = :id", { id: userInsert.id })
        .leftJoinAndSelect("user.rol", "rol")
        .addSelect(["*"])
        .getOne();
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
    const { correo, password } = req.body;
    const userFound = await repo
      .createQueryBuilder("user")
      .where("user.correo = :correo", { correo: correo })
      .leftJoinAndSelect("user.rol", "rol")
      .addSelect(["*"])
      .addSelect("user.password")
      .getOne();
    console.log(userFound);

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

    let payload = { id: userFound.id, correo: userFound.correo };
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
  const userFound = await repo
    .createQueryBuilder("user")
    .where("user.id = :id", { id: Number(id) })
    .leftJoinAndSelect("user.rol", "rol")
    .addSelect(["*"])
    .getOne();

  if (userFound) return res.status(200).json(userFound);

  return res.status(400).json({ error: "Usuario no existe." });
};

export const getUserByRol = async (req: Request, res: Response) => {
  const { rol } = req.params;
  const usersFound = await Usuario.find({
    where: { id_rol: Number(rol) },
  });

  return res.status(200).json(usersFound);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const usersFound = await repo
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.rol", "rol")
    .addSelect(["*"])
    .getMany();
  return res.status(200).json(usersFound);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { correo, password, segundo_nombre } = req.body;

  const userFound = await Usuario.findOneBy({
    id: Number(id),
  });

  if (!userFound) return res.status(400).json({ error: "Usuario no existe." });

  const hashedPassword = password
    ? await argon2.hash(password)
    : userFound.password;

  const update = await repo
    .createQueryBuilder()
    .update({
      foto_perfil: req.body.foto_perfil,
      nombre: req.body.nombre,
      segundo_nombre: segundo_nombre ? segundo_nombre : "",
      ape_paterno: req.body.ape_paterno,
      ape_materno: req.body.ape_materno,
      correo: correo,
      password: hashedPassword,
      telefono: req.body.telefono,
      edad: req.body.edad,
      matricula: req.body.matricula,
      sexo: req.body.sexo,
      id_rol: req.body.id_rol,
      activo: req.body.activo,
    })
    .where({
      id: userFound.id,
    })
    .returning("*")
    .execute();

  if (update.affected == 0) {
    return res.status(400).json({ error: "Hubo un error al actualizar." });
  } else {
    const userUpdated = await repo
      .createQueryBuilder("user")
      .where("user.id = :id", { id: Number(id) })
      .leftJoinAndSelect("user.rol", "rol")
      .addSelect(["*"])
      .getOne();

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

      if (userDeleted.affected == 0)
        return res.status(400).json({ error: "Hubo un error al eliminar." });

      return res
        .status(200)
        .json({ id: id, message: "Usuario eliminado correctamente." });
    } catch (error) {
      return res.status(400).json({ error: "Hubo un error al eliminar." });
    }
  }

  return res.send({ error: "No existe el usuario." });
};

export const deleteManyUser = async (req: Request, res: Response) => {
  const { ids } = req.body;
  try {
    const usersDeleted = await Usuario.delete({ id: In(ids) });

    if (usersDeleted) {
      if (usersDeleted.affected == 0)
        return res.status(400).json({ error: "Hubo un error al eliminar." });

      return res
        .status(200)
        .json({ ids: ids, message: "Usuarios eliminados correctamente." });
    }
    return res.status(400).json({ error: "No se encontraron coincidencias." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};
