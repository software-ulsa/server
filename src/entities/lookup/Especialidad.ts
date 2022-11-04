import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Especialista } from "../Especialista";

@Entity()
export class Especialidad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50 })
  nombre!: string;

  @Column({ type: "varchar", length: 50 })
  tipo!: string;

  @OneToMany(() => Especialista, (especialista) => especialista.especialidad, {
    cascade: true,
    onDelete: "CASCADE",
  })
  especialistas!: Especialista[];
}
