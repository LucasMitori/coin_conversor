import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 5 })
  originCurrency: string;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  valueCurrency: number;

  @Column({ length: 5 })
  destinationCurrency: string;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  resultValue: number;

  @Column({ type: "decimal", precision: 12, scale: 4 })
  rate: number;

  @Column({ length: 100 })
  dateTime: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.transaction)
  user: User;
}
