import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn
} from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class Codigo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  codigo!: number;

  @Column({ name: "id_user" })
  id_user!: number;

  @ManyToOne((type) => Usuario, (usuario) => usuario.id, {
    cascade: ["update"],
    nullable: false,
  })

  @JoinColumn({ name: "id_user" })
  usuario!: Usuario;
}
