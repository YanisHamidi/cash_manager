import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Products {
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
  description: string;

  @Column({
    type: 'character varying',
    nullable: false,
    default: '',
  })
  image: string;

  @Column({
    type: 'character varying',
    nullable: false,
    default: '',
  })
  price: string;
}
