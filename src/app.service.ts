import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  app(): any {
    return {
      name: 'API - CONSULTING',
      version: '1.0.0',
    };
  }
}
