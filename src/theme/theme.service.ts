import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateThemeDto } from './dto/create-theme.dto'
import { PrismaService } from '../prisma/prisma.service'
@Injectable()
export class ThemeService {
	constructor(private readonly prisma: PrismaService) {}
	async createTheme(createMessageDto: CreateThemeDto) {
		try {
			const newtheme = await this.prisma.$transaction(async tx => {
				const existingTheme = await tx.theme.findUnique({
					where: { title: createMessageDto.title }
				})

				if (existingTheme) {
					throw new BadRequestException('такая тема уже есть')
				}

				return tx.theme.create({
					data: {
						title: createMessageDto.title
					}
				})
			})

			return newtheme
		} catch (error) {
			if (error instanceof BadRequestException) {
				throw error
			}
			throw new BadRequestException('Ошибка при завершении обращения')
		}
	}
}
