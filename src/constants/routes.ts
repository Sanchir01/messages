export const MESSAGES_CONTROLLER = 'messages' as const

export const API_ROUTES = {
	GETALL: '',
	CREATE_MESSAGE: '',
	CLOSE_MESSAGE: 'close/:uuid',
	ADD_TO_WORK_MESSAGE: 'work/:uuid',
	COMPLETED_MESSAGE: 'completed/:uuid',
	END_ALL_MESSAGES_TO_WORK: 'close-all-work'
} as const
