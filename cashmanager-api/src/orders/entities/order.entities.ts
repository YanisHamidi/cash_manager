import { Users } from '../../typeorm';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.orders)
  user: Users;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: '0.00',
  })
  price: number;

  @Column({
    type: 'simple-array',
    nullable: false,
    default: '{}',
  })
  idProduct: number[];

  @Column({
    type: 'character varying',
    nullable: false,
    default: '',
  })
  status: string;
}
