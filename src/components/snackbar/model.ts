export type MessageType = 'error' | 'warning' | 'info' | 'success';

export type Message = {
	value: string;
	type: MessageType;
};
