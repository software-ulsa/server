import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Persona extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 120 })
  nombre!: string;

  @Column({ type: "varchar", length: 50 })
  ape_paterno!: string;

  @Column({ type: "varchar", length: 50 })
  ape_materno!: string;

  @Column({ type: "date" })
  fecha_nac!: Date;

  @Column({ type: "varchar", length: 10 })
  sexo!: string;

  @Column({ type: "varchar", length: 15 })
  telefono!: string;

  @Column({ type: "varchar", length: 60, unique: true })
  correo!: string;
}
