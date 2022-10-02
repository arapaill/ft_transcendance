export class ChatMessage {
	userPseudo!: string;
	userAvatar!: string;
	text!: string;
	date!: Date;
}

export class ChatChannel {
	name!: string;
	owner!: string;
	admins!: string[];
	users!: string[];
	type!: string;
	password?: string = "";
	messages!: ChatMessage[];
}
