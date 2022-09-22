export class ChatMessage {
	userPseudo!: string;
	userAvatar!: string;
	text!: string;
	date!: Date;
}

export class ChatChannel {
	name!: string;
	admin!: string;
	users!: string[];
	passwordEnabled: boolean = false;
	password?: string = "";
	messages!: ChatMessage[];
}
