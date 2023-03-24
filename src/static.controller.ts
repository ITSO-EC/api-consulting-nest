import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';

@ApiTags('Static Files') // Agrega una etiqueta a la documentación de Swagger
@Controller()
export class StaticController {
    @Get('uploads/:imgpath')
    serveImage(@Res() res, @Param('imgpath') image: string) {
        const pathUploads = path.join(__dirname, '..', 'uploads');
        res.sendFile(image, { root: pathUploads });
    }
}
