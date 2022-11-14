import { In } from "typeorm";
import { dataSource } from "../../db.config";
import { Request, Response } from "express";
import { Historial } from "../../entities/relation/Historial";
import { Curso } from "../../entities/Curso";
import { Suscripcion } from "../../entities/relation/Suscripcion";

const repo = dataSource.getRepository(Historial);

export const createActivityComplete = async (req: Request, res: Response) => {
  const { curso_id, paciente_id, actividad_id } = req.body;

  const activityCompleteInsert = await Historial.save({
    curso_id: curso_id,
    paciente_id: paciente_id,
    actividad_id: actividad_id,
    fecha_completado: new Date(),
  });

  if (activityCompleteInsert) {
    const cursoInProgress = await Suscripcion.findOne({
      where: { curso_id: Number(curso_id), paciente_id: Number(paciente_id) },
    });
    const activitiesCompleteFound = await Historial.find({
      where: { paciente_id: Number(paciente_id), curso_id: Number(curso_id) },
    });

    const progressUpdate = await Suscripcion.update(
      { id: cursoInProgress!.id },
      {
        progreso:
          (activitiesCompleteFound.length /
            cursoInProgress!.curso.actividades.length) *
          100,
      }
    );
    return res.status(201).json({
      acitvidad: activityCompleteInsert,
      message: "Actividad completada",
    });
  }

  return res
    .status(400)
    .json({ error: "Hubo un error al completar la actividad." });
};

export const getProgressByUserId = async (req: Request, res: Response) => {
  const { paciente, curso } = req.params;

  const cursoInProgress = await Suscripcion.findOne({
    where: { curso_id: Number(curso), paciente_id: Number(paciente) },
  });
  const activitiesCompleteFound = await Historial.find({
    where: { paciente_id: Number(paciente), curso_id: Number(curso) },
  });

  if (cursoInProgress) {
    const progress = cursoInProgress.curso.actividades.map((actividad) => {
      const isCompleted = activitiesCompleteFound.find(
        (item) => item.actividad_id === actividad.id
      );
      if (isCompleted) {
        return Object.assign({ completada: true }, actividad);
      } else {
        return Object.assign({ completada: false }, actividad);
      }
    });
    cursoInProgress.curso.actividades = progress;
    cursoInProgress.progreso =
      (activitiesCompleteFound.length /
        cursoInProgress.curso.actividades.length) *
      100;
    return res.status(200).json(cursoInProgress);
  }

  return res.status(400).json({ error: "Debes inscribirte al curso primero." });
};

export const deleteActivityComplete = async (req: Request, res: Response) => {
  const { paciente, curso, actividad } = req.params;
  try {
    const activityCompletedDeleted = await Historial.delete({
      paciente_id: Number(paciente),
      curso_id: Number(curso),
      actividad_id: Number(actividad),
    });

    if (activityCompletedDeleted) {
      if (activityCompletedDeleted.affected == 0) {
        return res.status(400).json({ error: "Hubo un error al eliminar." });
      } else {
        const cursoInProgress = await Suscripcion.findOne({
          where: {
            curso_id: Number(curso),
            paciente_id: Number(paciente),
          },
        });
        const activitiesCompleteFound = await Historial.find({
          where: {
            paciente_id: Number(paciente),
            curso_id: Number(curso),
          },
        });

        const progressUpdate = await Suscripcion.update(
          { id: cursoInProgress!.id },
          {
            progreso:
              (activitiesCompleteFound.length /
                cursoInProgress!.curso.actividades.length) *
              100,
          }
        );

        return res.status(200).json({
          id: activityCompletedDeleted.raw[0],
          message: "Actividad por completar",
        });
      }
    }
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};
