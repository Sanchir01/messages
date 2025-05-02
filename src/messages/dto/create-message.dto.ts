import { IsString } from 'class-validator'

export class CreateMessageDto {
	@IsString()
	themeId: string

	@IsString()
	starting_message: string
}
