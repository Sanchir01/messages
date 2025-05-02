import { IsString, Max } from 'class-validator'

export class CreateMessageDto {
	@IsString()
	themeId: string

	@IsString()
	@Max(2000)
	text: string
}
