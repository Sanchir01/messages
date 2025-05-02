import { Test, TestingModule } from '@nestjs/testing'
import { ThemeController } from './theme.controller'
import { ThemeService } from './theme.service'
import { Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { BadRequestException } from '@nestjs/common'
const title = faker.company.name.toString()
const newTheme: Prisma.ThemeCreateArgs = {
	data: { title: title }
}
describe('Theme Controller', () => {
	let controller: ThemeController
	let service: ThemeService
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ThemeController],
			providers: [
				{
					provide: ThemeService,
					useValue: {
						createTheme: jest.fn().mockResolvedValue(newTheme)
					}
				}
			]
		}).compile()

		controller = module.get<ThemeController>(ThemeController)
		service = module.get<ThemeService>(ThemeService)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it('should retunr theme', async () => {
		const result = await controller.create({
			title: title
		})
		expect(result).toEqual(newTheme)
	})
	it('should return theme', async () => {
		jest
			.spyOn(service, 'createTheme')
			.mockRejectedValueOnce(
				new BadRequestException('такая тема уже существует')
			)
		try {
			await controller.create({
				title: title
			})
		} catch (e) {
			expect(e).toBeInstanceOf(BadRequestException)
			expect(e.message).toBe('такая тема уже существует')
		}
	})
})
