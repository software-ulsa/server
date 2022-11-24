import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, 
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Usuario } from "./Usuario";

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

  @Column({ name: "usuario_id" })
  usuario_id!: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.notas, {
    eager: true,
    cascade: ["update"],
    nullable: false,
  })
  @JoinColumn({ name: "usuario_id" })
  usuario!: Usuario;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
