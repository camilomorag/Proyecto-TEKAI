import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column()
  descripcion!: string;

  @Column()
  estado!: string;

  @Column()
  responsable!: string;

  @CreateDateColumn()
  fechaCreacion!: Date;
}
