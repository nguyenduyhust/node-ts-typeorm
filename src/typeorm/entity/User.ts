import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({
    type: 'varchar',
    length: 1024,
  })
  password: string;

}
