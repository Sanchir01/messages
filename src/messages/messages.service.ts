import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateMessageDto } from './dto/create-message.dto'
import { CompleteMessageDto } from './dto/update-message.dto'
import { PrismaService } from '../prisma/prisma.service'
import { Status } from '@prisma/client'

@Injectable()
export class MessagesService {
	constructor(private readonly prisma: PrismaService) {}

	async createMessage(createMessageDto: CreateMessageDto) {
		try {
			const newMessage = await this.prisma.$transaction(async tx => {
				const existingTheme = await tx.theme.findUnique({
					where: { id: createMessageDto.themeId }
				})

				if (!existingTheme) {
					throw new BadRequestException('такой темы не существует')
				}

				return tx.addressing.create({
					data: {
						starting_message: createMessageDto.text,
						themeId: createMessageDto.themeId
					}
				})
			})

			return newMessage
		} catch (error) {
			if (error instanceof BadRequestException) {
				throw error
			}
			throw new BadRequestException('Ошибка при создании обращения')
		}
	}

	async findAll() {
		const allAddressing = await this.prisma.addressing.findMany()
		return allAddressing
	}

	endAllToWorkMessage() {
		return `This action returns a message`
	}

	async addToWorkMessage(id: string) {
		try {
			const newMessage = await this.prisma.$transaction(async tx => {
				const existingAddressing = await tx.addressing.findUnique({
					where: { id: id }
				})

				if (!existingAddressing) {
					throw new BadRequestException('такого обращения ннсуществует')
				}

				return tx.addressing.update({
					where: { id },
					data: {
						status: Status.В_работе
					}
				})
			})

			return newMessage
		} catch (error) {
			if (error instanceof BadRequestException) {
				throw error
			}
			throw new BadRequestException('Ошибка при завершении обращения')
		}
	}

	async completedMessage(id: string, completeMessageDto: CompleteMessageDto) {
		try {
			const newMessage = await this.prisma.$transaction(async tx => {
				const existingTheme = await tx.addressing.findUnique({
					where: { id: id }
				})

				if (!newMessage) {
					throw new BadRequestException('такой темы не существует')
				}

				return tx.addressing.update({
					where: { id },
					data: {
						solving_message: completeMessageDto.text,
						status: Status.Завершено
					}
				})
			})

			return newMessage
		} catch (error) {
			if (error instanceof BadRequestException) {
				throw error
			}
			throw new BadRequestException('Ошибка при завершении обращения')
		}
	}
}
