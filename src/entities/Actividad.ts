import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Actividad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 30 })
  titulo!: string;

  @Column({ type: "text" })
  url_media!: string;

  @Column({ type: "text" })
  descripcion!: string;

  @Column({ type: "integer" })
  peso!: number;
}
