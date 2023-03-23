import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';

@ApiTags('Static Files') // Agrega una etiqueta a la documentación de Swagger
@Controller()
export class StaticController {
    @Get('/uploads/*') // Utiliza la ruta deseada
    @ApiOperation({ summary: 'Serve static files from the "uploads" directory' }) // Añade una descripción a la operación
    serveStatic(req: express.Request, res: express.Response, next: express.NextFunction) {
        // Utiliza express.static() para servir archivos estáticos
        express.static(path.join(__dirname, '..', 'uploads'))(req, res, next);
    }
}
