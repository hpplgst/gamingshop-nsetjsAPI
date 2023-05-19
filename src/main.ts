import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { env } from "process";
import { ValidationPipe } from "@nestjs/common";
import { middleWare } from "./app.middleware";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    middleWare(app)
    await app.listen(env.PORT, () => console.log("Server Running ..."));
}
bootstrap()