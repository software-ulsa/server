import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import imagesRoutes from "./routes/ImagesRoutes";

import rolRoutes from "./routes/RolRoutes";
import userRoutes from "./routes/UsuarioRoutes";
import codigoRoutes from "./routes/lookup/CodigoRoutes";
import pacienteRoutes from "./routes/PacienteRoutes";
import especialistaRoutes from "./routes/EspecialistaRoutes";

import cursoRoutes from "./routes/CursoRoutes";
import actividadRoutes from "./routes/ActividadRoutes";
import notaRoutes from "./routes/NotaRoutes";
import publicidadRoutes from "./routes/PublicidadRoutes";

import categoriaRoutes from "./routes/lookup/CategoriaRoutes";
import especialidadRoutes from "./routes/lookup/EspecialidadRoutes";
import carreraRoutes from "./routes/lookup/CarreraRoutes";

import chatRoutes from "./routes/relation/ChatRoutes";
import historialRoutes from "./routes/relation/HistorialRoutes";
import suscripcionRoutes from "./routes/relation/SuscripcionRoutes";

import { connectDB } from "./db.config";
import { _apiHttpPort, _apiHttpsPort, _clientURL, _isProd } from "./constants";

const io = require("socket.io")();

const main = async () => {
  await connectDB();

  const fs = require("fs");
  const http = require("http");

  const app = express();
  app.use(
    cors({
      credentials: true,
      origin: "*",
    })
  );
  app.enable("trust proxy");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(morgan("dev"));
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

  // Para los many-to-many
  app.use(chatRoutes);
  app.use(historialRoutes);
  app.use(suscripcionRoutes);

  http.createServer(app).listen(_apiHttpPort, () => {
    console.log("HTTP listening on port: ", _apiHttpPort);
  });

  io.on("connection", (socket: any) => {
    console.log("A user connecterd");

    socket.on("message", (objeto: any) => {
      // console.log(objeto);
      io.emit("message", objeto);
    });
  });

  io.listen(3001);
};

main();
