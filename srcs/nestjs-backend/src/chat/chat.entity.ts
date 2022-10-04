import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  email: string;

  @Column({ unique: true })
  text: string;

  @Column()
  firstName: string;

  @Column({     type: "text",     array: true,     default: [] })
  roomsb: string[];

  @CreateDateColumn()
  createdAt: Date;

}