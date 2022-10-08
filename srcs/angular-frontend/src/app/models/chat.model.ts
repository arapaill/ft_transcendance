export class ChatMessage {
	userPseudo!: string;
	userAvatar!: string;
	text!: string;
	date!: Date;
	channelName!: string;
}

export class ChatChannel {
	id!: number;
	name!: string;
	owner!: string;
	admins!: string[];
	users!: string[];
	type!: string;
	password?: string = "";
	messages!: ChatMessage[];
}
