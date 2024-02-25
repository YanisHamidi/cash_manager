import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  identifier: string;

  @Column({ default: 'initiated' })
  status: string;

  constructor(identifier: string) {
    this.identifier = identifier;
    this.status = 'initiated';
  }
}
