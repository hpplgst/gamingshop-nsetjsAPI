import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from 'helmet'

export const middleWare = (app: any) => {

    //?pipe 
    app.useGlobalPipes(new ValidationPipe())

    //? swagger
    const config = new DocumentBuilder()
        .setTitle("hpplgst")
        .setDescription("hpplgst Docs")
        .setVersion("1.0")
        .addTag('hpp')
        .build();
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, document)


    app.use(helmet())


}