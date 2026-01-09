import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '@/app.module';
import { HttpExceptionFilter } from '@/share/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from '@/share/interceptors/transform.interceptor';
import * as cookieParser from 'cookie-parser';
import { PermissionsGuard } from '@/share/guard/permissions.guard';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Use global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Standardize success response
  app.useGlobalInterceptors(new TransformInterceptor());

  // Use cookie parser
  app.use(cookieParser());

  // Use permissions guard
  app.useGlobalGuards(new PermissionsGuard(new Reflector()));

  // Use class-validator and class-transformer
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('EVENHUB API')
    .setDescription('API documentation for EVENHUB application')
    .setVersion('1.0')
    .addTag('')
    .addTag('')
    .addTag('')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 4301;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api`);
}

bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
