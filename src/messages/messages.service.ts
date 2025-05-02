import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { CreateMessageDto } from './dto/create-message.dto'
import { CompleteMessageDto } from './dto/update-message.dto'
import { PrismaService } from '../prisma/prisma.service'
import { Status } from '@prisma/client'
import { GetMessagesDto } from './dto/filters.dto'

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
						starting_message: createMessageDto.starting_message,
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

	async findAll(getMessagesDto: GetMessagesDto) {
		const allAddressing = await this.prisma.addressing.findMany({
			where: {
				createdAt: {
					gte: getMessagesDto.startDate,
					lte: getMessagesDto.endDate
						? getMessagesDto.endDate
						: getMessagesDto.startDate
				}
			}
		})
		return allAddressing
	}

	async endAllToWorkMessage() {
		await this.prisma.addressing.updateMany({
			where: { status: Status.В_работе },
			data: { status: Status.Отменено }
		})
		return `success`
	}

	async addToWorkMessage(id: string) {
		try {
			await this.prisma.$transaction(async tx => {
				const existingAddressing = await tx.addressing.findUnique({
					where: { id: id }
				})

				if (!existingAddressing) {
					throw new BadRequestException('такого обращения не существует')
				}

				return tx.addressing.update({
					where: { id },
					data: {
						status: Status.В_работе
					}
				})
			})

			return 'success'
		} catch (error) {
			if (error instanceof BadRequestException) {
				throw error
			}
			throw new BadRequestException('Ошибка при завершении обращения')
		}
	}

	async cancelMessage(id: string) {
		try {
			await this.prisma.$transaction(async tx => {
				const isExistMessage = await this.prisma.addressing.findUnique({
					where: { id }
				})
				if (!isExistMessage) {
					throw new NotFoundException('нету обращения с таким айди')
				}
				return this.prisma.addressing.update({
					where: { id },
					data: { status: Status.Отменено, cancellation_message: '' }
				})
			})
			return 'cancelling'
		} catch (e) {
			throw new BadRequestException('Ошибка при завершении обращения')
		}
	}
	async completedMessage(id: string, completeMessageDto: CompleteMessageDto) {
		try {
			const newMessage = await this.prisma.$transaction(async tx => {
				const existingTheme = await tx.addressing.findUnique({
					where: { id: id }
				})

				if (!existingTheme) {
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

			return 'completed'
		} catch (error) {
			if (error instanceof BadRequestException) {
				throw error
			}
			throw new BadRequestException('Ошибка при завершении обращения')
		}
	}
}
