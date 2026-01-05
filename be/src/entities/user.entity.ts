import { UserRole } from '@/share/enum';

export class User {
  id: number;
  email: string;
  username: string;
  password: string;
  address: string;
  phone: string;
  role: UserRole;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
