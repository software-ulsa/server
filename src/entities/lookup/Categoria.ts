import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Curso } from "../Curso";

@Entity()
export class Categoria extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50 })
  nombre!: string;

  @Column({ type: "varchar", length: 150 })
  descripcion!: string;

  @OneToMany(() => Curso, (curso) => curso.categoria, {
    cascade: true,
    onDelete: "CASCADE",
  })
  curso!: Curso[];
}
