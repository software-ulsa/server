import { DataSource } from "typeorm";
import * as argon2 from "argon2";

import {
  _dbHost,
  _dbName,
  _dbPassword,
  _dbPort,
  _dbSync,
  _dbUser,
  _isProd,
  _token,
} from "./constants";
import { Rol } from "./entities/Rol";
import { Usuario } from "./entities/Usuario";
import { Especialista } from "./entities/Especialista";
import { Actividad } from "./entities/Actividad";
import { Curso } from "./entities/Curso";
import { Nota } from "./entities/Nota";
import { Publicidad } from "./entities/Publicidad";
import { Codigo } from "./entities/Codigo";

const jwt = require("jsonwebtoken");

export const dataSource = new DataSource({
  type: "postgres",
  username: _dbUser,
  password: _dbPassword,
  port: Number(_dbPort),
  host: _dbHost,
  database: _dbName,
  entities: [
    Rol,
    Usuario,
    Especialista,
    Actividad,
    Curso,
    Nota,
    Publicidad,
    Codigo,
  ],
  synchronize: _dbSync,
  ssl: !_isProd,
  migrations: [`${__dirname}/src/migrations/**/*{.ts,.js}`],
});

const insertarAdmin = async () => {
  const adminFound = await Usuario.findOne({
    where: { correo: "admin@gmail.com" },
  });

  if (adminFound) return;

  const resultRol = await Rol.save({
    nombre: "Administrador",
    descripcion: "Superusuario con todos los permisos",
  });

  const userRol = await Rol.save({
    nombre: "Usuario",
    descripcion: "Permiso solo para consumir la informacion",
  });

  const hashedPassword = await argon2.hash("t3mpor4l");
  try {
    const userInsert = await Usuario.save({
      foto_perfil:
        "https://i.pinimg.com/originals/19/93/c3/1993c392d24666e1d18fe842d7eb666b.jpg",
      nombre: "Administrador",
      ape_paterno: "De Los",
      ape_materno: "Dioses",
      correo: "admin@gmail.com",
      password: hashedPassword,
      telefono: "9514268601",
      edad: 100,
      matricula: "014419799",
      sexo: "Masculino",
      id_rol: resultRol.id,
    });

    if (userInsert) {
      let payload = {
        id: userInsert.id,
        correo: "admin@gmail.com",
      };
      jwt.sign(payload, _token);
    }
  } catch (error) {
    console.log(error);
  }
};

export const connectDB = async () => {
  dataSource
    .initialize()
    .then(() => {
      console.log("Conectado a la base de datos");
      insertarAdmin().then(() => {
        console.log("Administrador creado");
      });
    })
    .catch((err: any) => {
      console.error(err);
    });
};
