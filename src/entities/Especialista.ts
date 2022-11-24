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
import { Domicilio } from "./lookup/Domicilio";
import { Especialidad } from "./lookup/Especialidad";
import { Chat } from "./relation/Chat";
import { Usuario } from "./Usuario";

@Entity()
export class Especialista extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 10 })
  cedula_prof!: string;

  @Column({ name: "domicilio_id" })
  domicilio_id!: number;

  @OneToOne(() => Domicilio, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "domicilio_id" })
  domicilio!: Domicilio;

  @Column({ name: "especialidad_id" })
  especialidad_id!: number;

  @ManyToOne(() => Especialidad, (especialidad) => especialidad.especialistas, {
    cascade: ["update"],
    nullable: false,
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "especialidad_id" })
  especialidad!: Especialidad;

  @Column({ name: "usuario_id" })
  usuario_id!: number;

  @OneToOne(() => Usuario, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "usuario_id" })
  usuario!: Usuario;

  @OneToMany(() => Chat, (chat) => chat.especialista, {
    cascade: true,
    onDelete: "CASCADE",
  })
  chat!: Chat[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
