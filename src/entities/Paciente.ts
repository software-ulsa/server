import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Carrera } from "./lookup/Carrera";
import { Chat } from "./relation/Chat";
import { Historial } from "./relation/Historial";
import { Suscripcion } from "./relation/Suscripcion";
import { Usuario } from "./Usuario";

@Entity()
export class Paciente extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 10 })
  matricula!: string;

  @Column({ name: "carrera_id" })
  carrera_id!: number;

  @ManyToOne(() => Carrera, (carrera) => carrera.pacientes, {
    cascade: ["update"],
    nullable: false,
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "carrera_id" })
  carrera!: Carrera;

  @Column({ name: "usuario_id" })
  usuario_id!: number;

  @OneToOne(() => Usuario, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "usuario_id" })
  usuario!: Usuario;

  @OneToMany(() => Chat, (chat) => chat.paciente, {
    cascade: true,
    onDelete: "CASCADE",
  })
  chat!: Chat[];

  @OneToMany(() => Suscripcion, (suscripcion) => suscripcion.paciente, {
    cascade: true,
    onDelete: "CASCADE",
  })
  suscripcion!: Suscripcion[];

  @OneToMany(() => Historial, (historial) => historial.paciente, {
    cascade: true,
    onDelete: "CASCADE",
  })
  historial!: Historial[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
