import { Orders } from '../../orders/entities/order.entities';
import { Shops } from '../../typeorm';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  valid: boolean;

  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];

  @OneToMany(() => Shops, (shop) => shop.owner)
  shops: Shops[];
}
