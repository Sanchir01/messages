import { Test, TestingModule } from '@nestjs/testing'
import { Prisma, PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { MessagesController } from './messages.controller'
import { MessagesService } from './messages.service'

const text = faker.word.words({ count: 10 })
const newMessage: Prisma.AddressingCreateArgs = {
	data: { starting_message: text, themeId: '' }
}
const message = {
	id: faker.string.uuid(),
	createdAt: faker.date.past(),
	updatedAt: faker.date.past(),
	themeId: faker.string.uuid(),
	starting_message: text,
	ending_message: text || null
}
const testEndpoints = {
	findAll: jest.fn().mockResolvedValue([message]),
	createMessage: jest.fn().mockResolvedValue(newMessage),
	endAllToWorkMessage: jest.fn().mockResolvedValue('success'),
	cancelMessage: jest.fn().mockResolvedValue('cancelling'),
	addToWorkMessage: jest.fn().mockResolvedValue('success'),
	completedMessage: jest.fn().mockResolvedValue('completed')
}
describe('Messages Controller', () => {
	let controller: MessagesController
	let service: MessagesService
	const prisma = new PrismaClient()

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [MessagesController],
			providers: [
				{
					provide: MessagesService,
					useValue: testEndpoints
				}
			]
		}).compile()

		controller = module.get<MessagesController>(MessagesController)
		service = module.get<MessagesService>(MessagesService)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it(' should be return all messages', async () => {
		const queryParams = {
			startDate: faker.date.past(),
			endDate: faker.date.future()
		}
		const messages = await controller.findAll(queryParams)
		expect(messages).toEqual([message])
	})
	it('should create a new theme', async () => {
		const theme = await prisma.theme.findFirst()
		if (!theme) {
			throw new Error('Theme not found')
		}
		const props = { themeId: theme.id, starting_message: text }
		const result = await controller.create(props)
		expect(result).toEqual(newMessage)
	})
	it('should end  messages to work', async () => {
		const result = await controller.endAllToWorkMessages()
		expect(result).toEqual('success')
	})
	it('should cancel work message', async () => {
		const theme = await prisma.theme.findFirst()
		if (!theme) {
			throw new Error('Theme not found')
		}
		const result = await controller.cancelWorkMessage(theme.id)
		expect(result).toEqual('cancelling')
	})
	it('should add work message', async () => {
		const theme = await prisma.theme.findFirst()
		if (!theme) {
			throw new Error('Theme not found')
		}
		const result = await controller.workToMessage(theme.id)
		expect(result).toEqual('success')
	})
	it('should complete message', async () => {
		const theme = await prisma.theme.findFirst()
		if (!theme) {
			throw new Error('Theme not found')
		}
		const props = { themeId: theme.id, text }
		const result = await controller.completedMessage(theme.id, props)
		expect(result).toEqual('completed')
	})
})
