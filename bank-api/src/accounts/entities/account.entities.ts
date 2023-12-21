import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Accounts {
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
    nullable: false,
    default: '',
  })
  phonenumber: string;

  @Column({
    type: 'character varying',
    default: ''
  })
  accountId: string;

  @Column({
    type: 'character varying',
    nullable: false,
    default: '',
  })
  cbId: string;

  @Column({
    nullable: false,
    default: 0,
  })
  solde: number;
}
