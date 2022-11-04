import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Especialista } from "../Especialista";

@Entity()
export class Domicilio extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 80 })
  calle!: string;

  @Column({ type: "varchar", length: 50 })
  colonia!: string;

  @Column({ type: "varchar", length: 50 })
  estado!: string;

  @Column({ type: "varchar", length: 6 })
  codigo_postal!: string;
}
