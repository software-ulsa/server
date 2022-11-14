import { In } from "typeorm";
import { dataSource } from "../../db.config";
import { Request, Response } from "express";
import { Chat } from "../../entities/relation/Chat";

const repo = dataSource.getRepository(Chat);

export const createMensaje = async (req: Request, res: Response) => {
  const { paciente_id, especialista_id, mensaje } = req.body;

  const mensajeInsert = await Chat.save({
    paciente_id: paciente_id,
    especialista_id: especialista_id,
    mensaje: mensaje,
    fecha_envio: new Date(),
  });

  if (mensajeInsert) return res.status(201).json({ mensaje: mensajeInsert });
  return res.status(400).json({ error: "Hubo un error al crear el mensaje." });
};

export const getAllMensajes = async (req: Request, res: Response) => {
  const { paciente, especialista } = req.params;
  console.log(req.params);
  const mensajesFound = await Chat.find({
    where: {
      paciente_id: Number(paciente),
      especialista_id: Number(especialista),
    },
  });
  return res.status(200).json(mensajesFound);
};

export const deleteMensaje = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const mensajeDeleted = await Chat.delete({
      id: Number(id),
    });

    if (mensajeDeleted) {
      if (mensajeDeleted.affected == 0)
        return res.status(400).json({ error: "Hubo un error al eliminar." });

      return res.status(200).json({ id: id });
    }
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};

export const deleteManyMensaje = async (req: Request, res: Response) => {
  const { ids } = req.body;

  try {
    const mensajeesDeleted = await Chat.delete({ id: In(ids) });

    if (mensajeesDeleted) {
      if (mensajeesDeleted.affected == 0)
        return res.status(400).json({ error: "Hubo un error al eliminar." });

      return res.status(200).json({ ids: ids });
    }

    return res.status(400).json({ error: "No se encontraron coincidencias." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};
