import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import userRoutes from "./routes/UsuarioRoutes";
import rolRoutes from "./routes/RolRoutes";
import imagesRoutes from "./routes/ImagesRoutes";
import actividadRoutes from "./routes/ActividadRoutes";
import cursoRoutes from "./routes/CursoRoutes";
import especialistaRoutes from "./routes/EspecialistaRoutes";
import notaRoutes from "./routes/NotaRoutes";
import publicidadRoutes from "./routes/PublicidadRoutes";
import codigoRoutes from "./routes/CodigoRoutes";

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

  app.use(userRoutes);
  app.use(rolRoutes);
  app.use(imagesRoutes);
  app.use(actividadRoutes);
  app.use(cursoRoutes);
  app.use(especialistaRoutes);
  // app.use(notaRoutes);
  // app.use(publicidadRoutes);
  app.use(codigoRoutes);

  app.listen(_apiPort);
  console.log("Listening on port: ", _apiPort);
};

main();
