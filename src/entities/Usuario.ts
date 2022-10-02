import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rol } from "./Rol";

@Entity()
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  foto_perfil!: string;

  @Column({ type: "varchar", length: 60 })
  nombre!: string;

  @Column({ type: "varchar", length: 30, nullable: true })
  segundo_nombre!: string;

  @Column({ type: "varchar", length: 30 })
  ape_paterno!: string;

  @Column({ type: "varchar", length: 30 })
  ape_materno!: string;

  @Column({ type: "varchar", length: 80, unique: true })
  correo!: string;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "varchar", length: 30 })
  telefono!: string;

  @Column({ type: "integer" })
  edad!: number;

  @Column({ type: "varchar", length: 10 })
  matricula!: string;

  @Column({ type: "varchar", length: 30 })
  sexo!: string;

  @Column({ name: "id_rol" })
  id_rol!: number;

  @ManyToOne((type) => Rol, (rol) => rol.usuario, {
    cascade: ["update"],
    nullable: false,
  })
  @JoinColumn({ name: "id_rol" })
  rol!: Rol;
}