import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Curso } from "./Curso";

@Entity()
export class Actividad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 30 })
  titulo!: string;

  @Column({ type: "text" })
  url_media!: string;

  @Column({ type: "text" })
  descripcion!: string;

  @Column({ type: "integer" })
  peso!: number;

  @Column({ name: "id_curso" })
  id_curso!: number;

  @ManyToOne(() => Curso, (curso) => curso.actividades, {
    cascade: ["update"],
    nullable: false,
  })
  @JoinColumn({ name: "id_curso" })
  curso!: Curso;
}
