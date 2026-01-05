import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getDashboard(): string {
    return 'Welcome to Admin Dashboard!';
  }
}
