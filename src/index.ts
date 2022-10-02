import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import userRoutes from "./routes/UsuarioRoutes";
import rolRoutes from "./routes/RolRoutes";
import imagesRoutes from "./routes/ImagesRoutes";

import { connectDB } from "./db.config";
import { _apiPort, _clientURL, _isProd } from "./constants";

const main = async () => {
  await connectDB();

  const app = express();
  app.use(
    cors({
      credentials: true,
      origin: [_clientURL!],
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(userRoutes);
  app.use(rolRoutes);
  app.use(imagesRoutes);

  app.listen(_apiPort);
  console.log("Listening on port: ", _apiPort);
};

main();
