import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import imagesRoutes from "./routes/ImagesRoutes";

import rolRoutes from "./routes/RolRoutes";
import userRoutes from "./routes/UsuarioRoutes";
import codigoRoutes from "./routes/CodigoRoutes";
import pacienteRoutes from "./routes/PacienteRoutes";
import especialistaRoutes from "./routes/EspecialistaRoutes";

import cursoRoutes from "./routes/CursoRoutes";
import actividadRoutes from "./routes/ActividadRoutes";
import notaRoutes from "./routes/NotaRoutes";
import publicidadRoutes from "./routes/PublicidadRoutes";

import categoriaRoutes from "./routes/CategoriaRoutes";
import especialidadRoutes from "./routes/EspecialidadRoutes";
import carreraRoutes from "./routes/CarreraRoutes";

import { connectDB } from "./db.config";
import { _apiPort, _clientURL, _isProd } from "./constants";

const main = async () => {
  await connectDB();

  const app = express();
  app.use(
    cors({
      credentials: true,
      origin: "*",
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(morgan("dev"));

  // Para las imagenes
  app.use(imagesRoutes);

  // Para los usuarios y entidades relacionadas
  app.use(rolRoutes);
  app.use(userRoutes);
  app.use(codigoRoutes);
  app.use(pacienteRoutes);
  app.use(especialistaRoutes);

  // Para funcionalidades
  app.use(cursoRoutes);
  app.use(actividadRoutes);
  app.use(notaRoutes);
  app.use(publicidadRoutes);

  // Para los catalogos
  app.use(categoriaRoutes);
  app.use(especialidadRoutes);
  app.use(carreraRoutes);

  app.listen(_apiPort);
  console.log("Listening on port: ", _apiPort);
};

main();
