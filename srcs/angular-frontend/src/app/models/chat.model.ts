export class ChatMessage {
	userPseudo!: string;
	userID!: number;
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

	usersBanned: number[] = [];
	usersKicked: number[] = [];
	usersMuted: number[] = [];
}
