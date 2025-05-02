import { Module } from '@nestjs/common'

import { MessagesModule } from './messages/messages.module'
import { PrismaModule } from './prisma/prisma.module'

import { ThemeModule } from './theme/theme.module'

@Module({
	imports: [MessagesModule, PrismaModule, ThemeModule],
	providers: []
})
export class AppModule {}
