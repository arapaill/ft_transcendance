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
	user: string;
	
	@Column({ unique: true })
	text: string;
	
	@CreateDateColumn()
	createdAt: Date;
}