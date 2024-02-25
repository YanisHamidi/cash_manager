import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from '../../products/entities/products.entities';
import { Users } from '../../typeorm';

@Entity()
export class Shops {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'character varying',
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    type: 'character varying',
    nullable: false,
    default: '',
  })
  address: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 6,
    nullable: false,
    default: '0.000000',
  })
  latitude: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 6,
    nullable: false,
    default: '0.000000',
  })
  longitude: number;

  @Column({
    type: 'character varying',
    nullable: false,
    default: '',
  })
  image: string;

  @OneToMany(() => Products, (product) => product.shop)
  products: Products[];

  @ManyToOne(() => Users, (user) => user.shops)
  owner: Users;
}
