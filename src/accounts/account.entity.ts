import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../auth/user.entity';
import { Abstract } from '../db/class/abstractEntity';

@Entity('Accounts')
export class Account extends Abstract {
  @Column({ unique: true, length: 44 })
  username: string;

  @Column({ type: 'text', default: '' })
  bio: string;

  @Column({ length: 244, nullable: true })
  profilePic: string;

  @ManyToOne(() => User, (user) => user.accounts)
  owner: User;
}
