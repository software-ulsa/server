import { Request, Response } from "express";
import { Usuario } from "../entities/Usuario";

import * as argon2 from "argon2";
import { dataSource } from "../db.config";
import { _token } from "../constants";

const jwt = require("jsonwebtoken");
const repo = dataSource.getRepository(Usuario);
require("dotenv").config();

export const createUser = async (req: Request, res: Response) => {
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
    });

    if (userInsert) {
      let payload = {
        id: userInsert.id,
        correo: correo,
      };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET);
      return res.send({ userInsert, token });
    }
  } catch (error) {
    return res.json({ error: "Hubo un error al registrar al usuario." });
  }
};

export const login = async (req: Request, res: Response) => {
  const { correo, password } = req.body;
  const userFound = await repo
    .createQueryBuilder("user")
    .where("user.correo = :correo", { correo: correo })
    .leftJoinAndSelect("user.rol", "rol")
    .addSelect(["*"])
    .getOne();

  if (!userFound) {
    return res.json({ message: "Usuario no existe" });
  }

  const valid = await argon2.verify(userFound!.password, password);
  if (!valid) {
    return res.json({ message: "Contraseña incorrecta" });
  }

  let payload = { id: userFound.id, correo: userFound.correo };
  const token = jwt.sign(payload, _token);

  return res.status(200).header("auth-token", token).json({ userFound, token });
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userFound = await repo
    .createQueryBuilder("user")
    .where("user.id = :id", { id: Number(id) })
    .leftJoinAndSelect("user.rol", "rol")
    .addSelect(["*"])
    .getOne();

  return res.status(200).json(userFound);
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

  if (!userFound)
    return res.json({
      success: false,
      message: "Usuario no existe",
    });

  const hashedPassword = await argon2.hash(password);

  const userUpdated = await Usuario.update(
    { id: userFound.id },
    {
      foto_perfil: req.body.foto_perfil,
      nombre: req.body.nombre,
      segundo_nombre: segundo_nombre ? segundo_nombre : "",
      ape_paterno: req.body.ape_paterno,
      ape_materno: req.body.ape_materno,
      correo: correo,
      password: password !== "" ? hashedPassword : userFound.password,
      telefono: req.body.telefono,
      edad: req.body.edad,
      matricula: req.body.matricula,
      sexo: req.body.sexo,
      id_rol: req.body.id_rol,
    }
  );

  return res.json({
    success: userUpdated.affected === 1,
    message:
      userUpdated.affected === 1
        ? "Usuario actualizado correctamente"
        : "Hubo un error al actualizar",
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userFound = await Usuario.findOneBy({
    id: Number(id),
  });

  if (userFound) {
    const userDeleted = await Usuario.delete({
      id: Number(id),
    });

    return res.send(
      userDeleted.affected === 1
        ? "Usuario eliminado"
        : "Hubo un error al eliminar al usuario"
    );
  }

  return res.send({ error: "No existe el usuario." });
};