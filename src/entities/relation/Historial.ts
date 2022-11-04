import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Actividad } from "../Actividad";
import { Paciente } from "../Paciente";

@Entity()
export class Historial extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date" })
  fecha_completado!: Date;

  @Column({ name: "curso_id" })
  curso_id!: number;

  @Column({ name: "paciente_id" })
  paciente_id!: number;

  @ManyToOne(() => Paciente)
  @JoinColumn({ name: "paciente_id" })
  paciente!: Paciente;

  @Column({ name: "actividad_id" })
  actividad_id!: number;

  @ManyToOne(() => Actividad)
  @JoinColumn({ name: "actividad_id" })
  actividad!: Actividad;
}
