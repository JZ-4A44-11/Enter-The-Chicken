import Account from '../accounts/account.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Abstract } from '../db/class/abstractEntity';

@Entity('Users')
export class User extends Abstract {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Account, (account) => account.onwer)
  accounts: Account[];
}
