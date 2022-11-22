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
import { Codigo } from "./entities/lookup/Codigo";
import { Paciente } from "./entities/Paciente";
import { Chat } from "./entities/relation/Chat";
import { Historial } from "./entities/relation/Historial";
import { Suscripcion } from "./entities/relation/Suscripcion";
import { Carrera } from "./entities/lookup/Carrera";
import { Categoria } from "./entities/lookup/Categoria";
import { Domicilio } from "./entities/lookup/Domicilio";
import { Especialidad } from "./entities/lookup/Especialidad";
import { Persona } from "./entities/Persona";

import {
  createActividadesCompletadas,
  createAdmin,
  createCarreras,
  createCategorias,
  createCursos,
  createEspecialidades,
  createEspecialistas,
  createNotas,
  createPacientes,
  createRoles,
  createUsuarios,
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
    Persona,
    Codigo,
    Paciente,
    Especialista,
    Nota,
    Publicidad,
    Curso,
    Actividad,
    Chat,
    Historial,
    Suscripcion,
    Carrera,
    Categoria,
    Domicilio,
    Especialidad,
  ],
  synchronize: _dbSync,
  ssl: !_isProd,
  dropSchema: _dbSync,
  migrations: [`${__dirname}/src/migrations/**/*{.ts,.js}`],
});

export const connectDB = async () => {
  dataSource
    .initialize()
    .then(() => {
      console.log("Conectado a la base de datos");
      try {
        createCarreras();
        createEspecialidades();

        createRoles().then(() => {
          createUsuarios();
          createPacientes().then(() => {
            createCategorias().then(() => {
              createCursos().then(() => {
                createActividadesCompletadas();
              });
            });
          });
          createEspecialistas();
        });

        createAdmin().then(() => {
          createNotas();
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err: any) => {
      console.error(err);
    });
};
