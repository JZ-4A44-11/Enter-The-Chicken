import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Abstract {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createAt: number;

  @UpdateDateColumn()
  updateAt: number;
}
