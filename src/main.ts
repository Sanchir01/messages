import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
	FastifyAdapter,
	NestFastifyApplication
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter()
	)
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
