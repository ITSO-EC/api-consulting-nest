import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App') // Agrega una etiqueta a la documentación de Swagger
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOperation({ summary: 'Get API name and version' }) // Agrega una descripción a la operación
  getAppInfo(): any {
    return this.appService.app();
  }
}
