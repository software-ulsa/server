import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Publicidad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 30 })
  nombre!: string;

  @Column({ type: "varchar", length: 30 })
  dot_empresa!: string;

  @Column({ type: "text" })
  descripcion!: string;

  @Column({ type: "varchar", length: 30 })
  email!: string;

  @Column({ type: "text" })
  url!: string;

  @Column({ type: "date" })
  fecha_inicio!: Date;

  @Column({ type: "date" })
  fecha_vencimiento!: Date;
}
