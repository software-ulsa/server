import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Nota extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 60 })
  titulo!: string;

  @Column({ type: "text" })
  contenido!: string;

  @Column({ type: "text" })
  imagen!: string;

  @Column({ type: "varchar", length: 30 })
  estado!: string;

  @Column({ type: "varchar", length: 30 })
  tema!: string;

  @Column({ type: "varchar", length: 50, array: true })
  palabras_clave!: string[];
}
