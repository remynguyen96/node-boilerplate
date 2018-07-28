import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ nullable: false, default: false })
  confirmed: boolean;

  @Column({ type: 'varchar', length: '120' })
  firstName: string;

  @Column('text')
  lastName: string;

  @Column()
  age: number;
}
