import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Products } from '../../products/entities/products.entities';

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
}
