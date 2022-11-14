import { In } from "typeorm";
import { Request, Response } from "express";
import { dataSource } from "../../db.config";
import { Categoria } from "../../entities/lookup/Categoria";

const repo = dataSource.getRepository(Categoria);

export const createCategoria = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion } = req.body;

    const categoriaInsert = await Categoria.save({
      nombre: nombre,
      descripcion: descripcion,
    });

    if (categoriaInsert)
      return res.status(201).json({ categoria: categoriaInsert });
    return res
      .status(400)
      .json({ error: "Hubo un error al crear la categoria." });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Hubo un error al agregar la publicidad." });
  }
};

export const getCategoriaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categoriasFound = await Categoria.findOneBy({ id: Number(id) });

  if (categoriasFound) return res.status(200).json(categoriasFound);

  return res.status(400).json({ error: "No existe la categoria." });
};

export const getAllCategorias = async (req: Request, res: Response) => {
  const categoriasFound = await Categoria.find();
  return res.status(200).json(categoriasFound);
};

export const updateCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  const categoriasFound = await Categoria.findOneBy({
    id: Number(id),
  });

  if (!categoriasFound)
    return res.status(400).json({
      error: "Categoria no existe.",
    });

  const categoriasUpdated = await repo
    .createQueryBuilder()
    .update({
      nombre: nombre,
      descripcion: descripcion,
    })
    .where({
      id: categoriasFound.id,
    })
    .returning("*")
    .execute();

  if (categoriasUpdated.affected == 0)
    return res.status(400).json({ error: "Hubo un error al actualizar." });

  return res.status(201).json({ categoria: categoriasUpdated.raw[0] });
};

export const deleteCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categoriasFound = await Categoria.findOneBy({
    id: Number(id),
  });

  if (!categoriasFound)
    return res.status(400).json({
      error: "Categoria no existe.",
    });

  try {
    const categoriasDeleted = await Categoria.delete({
      id: Number(id),
    });

    if (categoriasDeleted) {
      if (categoriasDeleted.affected == 0)
        return res.status(400).json({ error: "Hubo un error al eliminar." });

      return res.status(200).json({ id: id });
    }
    return res.status(400).json({ error: "Categoria no existe." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};

export const deleteManyCategoria = async (req: Request, res: Response) => {
  const { ids } = req.body;

  try {
    const categoriasDeleted = await Categoria.delete({ id: In(ids) });

    if (categoriasDeleted) {
      if (categoriasDeleted.affected == 0)
        return res.status(400).json({ error: "Hubo un error al eliminar." });

      return res.status(200).json({ ids: ids });
    }

    return res.status(400).json({ error: "No se encontraron coincidencias." });
  } catch (error) {
    return res.status(400).json({ error: "Hubo un error al eliminar." });
  }
};
