import { NestFactory, Reflector } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from 'fastify-cookie';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './middlewares/all-exceptions.filter';
import { HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe } from './middlewares/validation.pipe';
import { UpdateTokensInterceptor } from './middlewares/updateTokens.interceptor';
import { VARS } from './config/vars';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    );
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new UpdateTokensInterceptor());

    await app.register(fastifyCookie, {
        secret: VARS.cookieSalt,
    });

    await app.listen(VARS.port, '0.0.0.0');
}
bootstrap();
