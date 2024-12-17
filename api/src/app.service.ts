import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(request) {
    if (!request.user) {
      return 'No google user';
    }
    return request.user;
  }
}
