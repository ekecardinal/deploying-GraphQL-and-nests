import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { BadRequestException, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: any) => {
        const formattedErrors = errors.reduce((acc, err) => {
          acc[err.property] = Object.values(err.constraints).join(',')
          return acc
        }, {})
        throw new BadRequestException(formattedErrors)
      },
    }),
  )
  app.enableCors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'X-requested-with'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
  await app.listen(4000)
}
bootstrap()
