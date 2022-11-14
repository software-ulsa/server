import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Curso } from "../Curso";
import { Paciente } from "../Paciente";

@Entity()
export class Suscripcion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date" })
  fecha_inicio!: Date;

  @Column({ type: "date", nullable: true })
  fecha_fin!: Date;

  @Column({ type: "decimal" })
  progreso!: number;

  @Column({ type: "integer" })
  valoracion!: number;

  @Column({ name: "paciente_id" })
  paciente_id!: number;

  @ManyToOne(() => Paciente)
  @JoinColumn({ name: "paciente_id" })
  paciente!: Paciente;

  @Column({ name: "curso_id" })
  curso_id!: number;

  @ManyToOne(() => Curso, { eager: true })
  @JoinColumn({ name: "curso_id" })
  curso!: Curso;
}
