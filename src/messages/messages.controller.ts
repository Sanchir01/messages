import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Query
} from '@nestjs/common'
import { MessagesService } from './messages.service'
import { CreateMessageDto } from './dto/create-message.dto'
import { CompleteMessageDto } from './dto/update-message.dto'
import { API_ROUTES, MESSAGES_CONTROLLER } from '../constants/routes'
import { GetMessagesDto } from './dto/filters.dto'

@Controller(MESSAGES_CONTROLLER)
export class MessagesController {
	constructor(private readonly messagesService: MessagesService) {}

	@Post()
	create(@Body() createMessageDto: CreateMessageDto) {
		return this.messagesService.createMessage(createMessageDto)
	}

	@Get()
	findAll(@Query('date') date: GetMessagesDto) {
		return this.messagesService.findAll()
	}

	@Post(API_ROUTES.END_ALL_MESSAGES_TO_WORK)
	endAllToWork() {
		return this.messagesService.endAllToWorkMessage()
	}

	@Patch(API_ROUTES.ADD_TO_WORK_MESSAGE)
	workToMessage(@Param('uuid') uuid: string) {
		return this.messagesService.addToWorkMessage(uuid)
	}

	@Post(API_ROUTES.COMPLETED_MESSAGE)
	completedMessage(
		@Param('uuid') uuid: string,
		@Body() completeMessageDto: CompleteMessageDto
	) {
		return this.messagesService.completedMessage(uuid, completeMessageDto)
	}
}
