import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Especialista } from "../Especialista";
import { Paciente } from "../Paciente";

@Entity()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  mensaje!: string;

  @Column({ type: "boolean" })
  recibido!: boolean;

  @Column({ type: "date" })
  fecha_envio!: Date;

  @Column({ name: "paciente_id" })
  paciente_id!: number;

  @ManyToOne(() => Paciente)
  @JoinColumn({ name: "paciente_id" })
  paciente!: Paciente;

  @Column({ name: "especialista_id" })
  especialista_id!: number;

  @ManyToOne(() => Especialista)
  @JoinColumn({ name: "especialista_id" })
  especialista!: Especialista;
}
