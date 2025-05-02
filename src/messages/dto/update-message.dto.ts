import { PartialType } from '@nestjs/mapped-types'
import { CreateMessageDto } from './create-message.dto'
import { IsOptional, IsString, Max } from 'class-validator'

export class UpdateMessageDto extends PartialType(CreateMessageDto) {}

export class CompleteMessageDto {
	@IsString()
	@Max(2000)
	@IsOptional()
	text: string
}
