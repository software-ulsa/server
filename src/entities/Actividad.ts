import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Curso } from "./Curso";
import { Historial } from "./relation/Historial";

@Entity()
export class Actividad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 30 })
  titulo!: string;

  @Column({ type: "text" })
  descripcion!: string;

  @Column({ type: "text" })
  url_media!: string;

  @Column({ name: "curso_id" })
  curso_id!: number;

  @ManyToOne(() => Curso, (curso) => curso.actividades, {
    cascade: ["update"],
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "curso_id" })
  curso!: Curso;

  @OneToMany(() => Historial, (historial) => historial.actividad, {
    cascade: true,
    onDelete: "CASCADE",
  })
  historial!: Historial[];
}
