import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('/api')
	const config = new DocumentBuilder()
		.setTitle('Messages docs')
		.setDescription('The cats API description')
		.setVersion('1.0')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('/api/docs', app, document)
	console.log(process.env.DATABASE_URL)
	await app.listen(process.env.PORT ?? 8080, '127.0.0.1')
}
bootstrap()
