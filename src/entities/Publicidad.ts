import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Publicidad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 120 })
  nombre!: string;

  @Column({ type: "text" })
  descripcion!: string;

  @Column({ type: "text" })
  empresa!: string;

  @Column({ type: "varchar", length: 120 })
  correo_empresa!: string;

  @Column({ type: "text" })
  url_empresa!: string;

  @Column({ type: "date" })
  fecha_inicio!: Date;

  @Column({ type: "date" })
  fecha_fin!: Date;

  @Column({ type: "text" })
  imagen!: string;

  @Column({ type: "bool" })
  activo!: string;
}
