import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Categoria } from "./lookup/Categoria";

@Entity()
export class Publicidad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 30 })
  nombre!: string;

  @Column({ type: "text" })
  descripcion!: string;

  @Column({ type: "text" })
  empresa!: string;

  @Column({ type: "varchar", length: 60 })
  correo_empresa!: string;

  @Column({ type: "text" })
  url_empresa!: string;

  @Column({ type: "date" })
  fecha_inicio!: Date;

  @Column({ type: "date" })
  fecha_fin!: Date;

  @Column({ type: "text" })
  imagen!: string;
}
