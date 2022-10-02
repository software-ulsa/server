import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
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

  @OneToMany((type) => Actividad, (actividad) => actividad.curso, {
    cascade: true,
    onDelete: "CASCADE",
  })
  actividades!: Actividad[];
}
