import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class Rol extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50 })
  nombre!: string;

  @Column({ type: "varchar", length: 150 })
  descripcion!: string;

  @Column({ type: "varchar", array: true })
  permisos!: string[];

  @OneToMany(() => Usuario, (usuario) => usuario.rol, {
    cascade: true,
    onDelete: "CASCADE",
  })
  usuario!: Usuario[];
}
