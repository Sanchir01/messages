import { IsDate, IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'
export class GetMessagesDto {
	@IsOptional()
	@IsDate()
	@Transform(({ value }) => new Date(value))
	date?: Date

	@IsOptional()
	@IsDate()
	@Transform(({ value }) => new Date(value))
	startDate?: Date

	@IsOptional()
	@IsDate()
	@Transform(({ value }) => new Date(value))
	endDate?: Date
}
