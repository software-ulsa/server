import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Actividad } from "./Actividad";

@Entity()
export class Curso extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 30 })
  titulo!: string;

  @Column({ type: "text" })
  descripcion!: string;

  @ManyToMany(() => Actividad)
  @JoinTable({ name: "actividad_x_curso" })
  actividades!: Actividad[];
}
