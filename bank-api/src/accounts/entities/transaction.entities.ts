import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  identifier: string;

  @Column()
  code: string;

  @Column({ default: 'initiated' })
  status: string;


  constructor(identifier: string, code: string) {
    this.identifier = identifier;
    this.code = code;
    this.status = 'initiated'; 
}
}