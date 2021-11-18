import { Column, Entity, OneToMany, BeforeInsert } from 'typeorm';
import { Abstract } from '../db/class/abstractEntity';
import Account from '../accounts/account.entity';
import { hash, compare } from 'bcrypt';

@Entity('Users')
export class User extends Abstract {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Account, (account) => account.onwer)
  accounts: Account[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<string> {
    return await compare(attempt, this.password);
  }
}
