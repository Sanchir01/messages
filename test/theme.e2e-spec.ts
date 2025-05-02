import { Test, TestingModule } from '@nestjs/testing'
import {
	BadRequestException,
	INestApplication,
	ValidationPipe
} from '@nestjs/common'
import * as request from 'supertest'
import { App } from 'supertest/types'
import { AppModule } from './../src/app.module'

import { faker } from '@faker-js/faker/.'
import { CreateMessageDto } from '../src/messages/dto/create-message.dto'
import { PrismaService } from '../src/prisma/prisma.service'

describe('ThemeController (e2e)', () => {
	let app: INestApplication<App>
	let prisma: PrismaService
	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile()

		app = moduleFixture.createNestApplication()
		app.useGlobalPipes(new ValidationPipe())
		app.setGlobalPrefix('/api')
		await app.init()
		prisma = app.get(PrismaService)
	})

	afterAll(async () => {
		await app.close()
	})
	it('/messages (GET)', async () => {
		const response = await request(app.getHttpServer()).get('/api/messages')
		return response
	})
	it('/messages (POST)', async () => {
		const themeId = await prisma.theme.findFirst()
		if (!themeId) {
			throw new BadRequestException()
		}
		const createMessageDto: CreateMessageDto = {
			starting_message: faker.word.words({ count: 2 }),
			themeId: themeId.id
		}
		const response = await request(app.getHttpServer())
			.post('/api/messages')
			.send(createMessageDto)
			.expect(201)
		console.log(response.body)
		expect(response.body).toMatchObject(createMessageDto)
	})
	it('messages/close/:uuid (POST)', async () => {
		const messageId = await prisma.addressing.findFirst()
		if (!messageId) {
			throw new BadRequestException()
		}
		await request(app.getHttpServer())
			.post(`/api/messages/close/${messageId.id}`)
			.expect(200)
	})
	it('messages/work/:uuid (POST)', async () => {
		const messageId = await prisma.addressing.findFirst()
		if (!messageId) {
			throw new BadRequestException()
		}
		await request(app.getHttpServer())
			.post(`/api/messages/work/${messageId.id}`)
			.expect(200)
	})
	it('messages/work/:uuid (POST)', async () => {
		const messageId = await prisma.addressing.findFirst()
		if (!messageId) {
			throw new BadRequestException()
		}
		await request(app.getHttpServer())
			.post(`/api/messages/completed/${messageId.id}`)
			.expect(200)
	})
	it('messages/work/:uuid (POST)', async () => {
		await request(app.getHttpServer())
			.post(`/api/messages/close-all-work`)
			.expect(200)
	})
})
