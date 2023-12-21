import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['accountId'])
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
    unique: true,
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
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  solde: number;
}
