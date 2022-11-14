import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Actividad } from "./Actividad";
import { Categoria } from "./lookup/Categoria";
import { Suscripcion } from "./relation/Suscripcion";

@Entity()
export class Curso extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  titulo!: string;

  @Column({ type: "text" })
  descripcion!: string;

  @Column({ type: "varchar", length: 100 })
  objetivo!: string;

  @Column({ type: "date" })
  fecha_inicio!: Date;

  @Column({ type: "date" })
  fecha_fin!: Date;

  @Column({ type: "integer" })
  duracion!: number;

  @Column({ type: "boolean" })
  activo!: boolean;

  @Column({ type: "text" })
  imagen!: string;

  @Column({ type: "varchar", array: true })
  palabras_clave!: string[];

  @Column({ name: "categoria_id" })
  categoria_id!: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.curso, {
    cascade: ["update"],
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: "categoria_id" })
  categoria!: Categoria;

  @OneToMany(() => Actividad, (actividad) => actividad.curso, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
  })
  actividades!: Actividad[];

  @OneToMany(() => Suscripcion, (suscripcion) => suscripcion.curso, {
    cascade: true,
    onDelete: "CASCADE",
  })
  suscripcion!: Suscripcion[];
}
