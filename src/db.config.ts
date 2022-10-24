import { DataSource } from "typeorm";

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
import {
  createUsuarios,
  createEspecialistas,
  createNotas,
  createCursos,
  createPublicidad,
} from "./createDummyData";

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

export const connectDB = async () => {
  dataSource
    .initialize()
    .then(() => {
      console.log("Conectado a la base de datos");
      createUsuarios();
      createEspecialistas();
      createNotas();
      createCursos();
      createPublicidad();
    })
    .catch((err: any) => {
      console.error(err);
    });
};
