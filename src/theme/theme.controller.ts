import { Body, Controller, Post } from '@nestjs/common'
import { ThemeService } from './theme.service'
import { CreateThemeDto } from './dto/create-theme.dto'

@Controller('theme')
export class ThemeController {
	constructor(private readonly themeService: ThemeService) {}
	@Post()
	create(@Body() createMessageDto: CreateThemeDto) {
		return this.themeService.createTheme(createMessageDto)
	}
}
