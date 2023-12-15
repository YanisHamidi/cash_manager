import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'character varying',
    nullable: false,
    default: '',
  })
  firstname: string;

  @Column({
    type: 'character varying',
    nullable: false,
    default: '',
  })
  lastname: string;

  @Column({
    type: 'character varying',
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    type: 'character varying',
    default: '',
    nullable: false,
  })
  password: string;
}
