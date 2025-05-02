import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Query,
	ValidationPipe,
	UsePipes
} from '@nestjs/common'
import { MessagesService } from './messages.service'
import { CreateMessageDto } from './dto/create-message.dto'
import { CompleteMessageDto } from './dto/update-message.dto'
import { API_ROUTES, MESSAGES_CONTROLLER } from '../constants/routes'
import { GetMessagesDto } from './dto/filters.dto'

@Controller(MESSAGES_CONTROLLER)
export class MessagesController {
	constructor(private readonly messagesService: MessagesService) {}

	@Post(API_ROUTES.CREATE_MESSAGE)
	@UsePipes(new ValidationPipe({ transform: true }))
	create(@Body() createMessageDto: CreateMessageDto) {
		return this.messagesService.createMessage(createMessageDto)
	}

	@Get(API_ROUTES.GETALL)
	findAll(@Query('date') getMessagesDto: GetMessagesDto) {
		return this.messagesService.findAll(getMessagesDto)
	}

	@Post(API_ROUTES.END_ALL_MESSAGES_TO_WORK)
	endAllToWorkMessages() {
		return this.messagesService.endAllToWorkMessage()
	}

	@Post(API_ROUTES.CLOSE_MESSAGE)
	cancelWorkMessage(@Param('uuid') uuid: string) {
		return this.messagesService.cancelMessage(uuid)
	}
	@Patch(API_ROUTES.ADD_TO_WORK_MESSAGE)
	workToMessage(@Param('uuid') uuid: string) {
		return this.messagesService.addToWorkMessage(uuid)
	}

	@Post(API_ROUTES.COMPLETED_MESSAGE)
	@UsePipes(new ValidationPipe({ transform: true }))
	completedMessage(
		@Param('uuid') uuid: string,
		@Body() completeMessageDto: CompleteMessageDto
	) {
		return this.messagesService.completedMessage(uuid, completeMessageDto)
	}
}
