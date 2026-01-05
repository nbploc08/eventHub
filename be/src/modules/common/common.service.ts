import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  getShare(): string {
    return 'Welcome to Shared Content!';
  }
}
