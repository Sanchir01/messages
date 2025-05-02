import { IsString } from 'class-validator'

export class CreateThemeDto {
	@IsString()
	title: string
}
