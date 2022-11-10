import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Codigo } from "./lookup/Codigo";
import { Nota } from "./Nota";
import { Persona } from "./Persona";
import { Rol } from "./Rol";

@Entity()
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 80, unique: true })
  username!: string;

  @Column({ type: "varchar", select: false })
  password!: string;

  @Column({ type: "text", nullable: true })
  imagen!: string;

  @Column({
    default: false,
  })
  activo!: boolean;

  @OneToMany(() => Nota, (nota) => nota.usuario, {
    cascade: true,
    onDelete: "CASCADE",
  })
  notas!: Nota[];

  @OneToMany(() => Codigo, (codigo) => codigo.usuario, {
    cascade: true,
    onDelete: "CASCADE",
  })
  codigo!: Codigo[];

  @Column({ name: "persona_id" })
  persona_id!: number;

  @OneToOne(() => Persona, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "persona_id" })
  persona!: Persona;

  @Column({ name: "rol_id" })
  rol_id!: number;

  @ManyToOne(() => Rol, (rol) => rol.usuario, {
    eager: true,
    cascade: ["update"],
    nullable: false,
  })
  @JoinColumn({ name: "rol_id" })
  rol!: Rol;
}
