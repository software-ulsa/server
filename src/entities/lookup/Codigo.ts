import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { Usuario } from "../Usuario";

@Entity()
export class Codigo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  codigo!: number;

  @Column({ name: "usuario_id" })
  usuario_id!: number;

  @ManyToOne((type) => Usuario, (usuario) => usuario.id, {
    cascade: ["update"],
    nullable: false,
  })
  @JoinColumn({ name: "usuario_id" })
  usuario!: Usuario;
}
