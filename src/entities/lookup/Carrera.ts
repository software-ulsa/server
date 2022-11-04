import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Paciente } from "../Paciente";

@Entity()
export class Carrera extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 120 })
  nombre!: string;

  @Column({ type: "varchar", length: 120 })
  abreviatura!: string;

  @OneToMany(() => Paciente, (paciente) => paciente.carrera, {
    cascade: true,
    onDelete: "CASCADE",
  })
  pacientes!: Paciente[];
}
