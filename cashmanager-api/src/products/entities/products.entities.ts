import { Shops } from '../../typeorm';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shops, (shop) => shop.products, { onDelete: 'CASCADE' })
  shop: Shops;

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
  description: string;

  @Column({
    type: 'character varying',
    nullable: false,
    default: '',
  })
  image: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: '0.00',
  })
  price: number;
}
