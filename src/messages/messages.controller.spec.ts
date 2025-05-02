import { Test, TestingModule } from '@nestjs/testing'
import { Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { MessagesController } from './messages.controller'
import { MessagesService } from './messages.service'

const text = faker.word.words({ count: 10 })
const newMessage: Prisma.AddressingCreateArgs = {
	data: { starting_message: text, themeId: '' }
}
describe('Theme Controller', () => {
	let controller: MessagesController
	let service: MessagesService
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [MessagesController],
			providers: [
				{
					provide: MessagesService,
					useValue: {
						createTheme: jest.fn().mockResolvedValue(newMessage)
					}
				}
			]
		}).compile()

		controller = module.get<MessagesController>(MessagesController)
		service = module.get<MessagesService>(MessagesService)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
