import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Especialista extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 60 })
  nombre!: string;

  @Column({ type: "varchar", length: 30, nullable: true })
  segundo_nombre!: string;

  @Column({ type: "varchar", length: 30 })
  ape_paterno!: string;

  @Column({ type: "varchar", length: 30 })
  ape_materno!: string;

  @Column({ type: "integer" })
  edad!: number;

  @Column({ type: "varchar", length: 30 })
  sexo!: string;

  @Column({ type: "text" })
  foto_especialista!: string;

  @Column({ type: "varchar", length: 30 })
  especialidad!: string;

  @Column({ type: "varchar", length: 30 })
  cedula!: string;

  @Column({ type: "varchar", length: 30 })
  area_especialidad!: string;

  @Column({ type: "varchar", length: 30 })
  telefono!: string;

  @Column({ type: "varchar", length: 30, nullable: true })
  telefono_casa!: string;

  @Column({ type: "varchar", length: 80, unique: true })
  correo!: string;
}
