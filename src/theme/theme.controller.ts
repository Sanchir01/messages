import {
	Body,
	Controller,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ThemeService } from './theme.service'
import { CreateThemeDto } from './dto/create-theme.dto'
import { API_ROUTES_THEME, THEME_CONTROLLER } from '../constants/routes'

@Controller(THEME_CONTROLLER)
export class ThemeController {
	constructor(private readonly themeService: ThemeService) {}

	@UsePipes(new ValidationPipe({ transform: true }))
	@Post(API_ROUTES_THEME.CREATE_THEME)
	create(@Body() createMessageDto: CreateThemeDto) {
		return this.themeService.createTheme(createMessageDto)
	}
}
