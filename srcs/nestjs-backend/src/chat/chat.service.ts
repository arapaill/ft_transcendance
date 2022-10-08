import { ConsoleLogger, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
	constructor(private prisma: PrismaService) {}

	async createNewChannel(channel: unknown) {
		console.log("New channel created: " + channel[0].name);
		const newChannel = await (this.prisma.chatChannel.create({
			data: {
				name: channel[0].name,
				owner: channel[0].owner,
				type: channel[0].type,
				users: channel[0].users,
				admins: channel[0].admins,
				password: channel[0].password
			}
		}))

		return newChannel;
	}

	async updateChannel(channel: any) {
		console.log("Updating channel " + channel[0].name);

		await this.prisma.chatChannel.update({
			where: {
				name: channel[0].name,
			},
			data: {
				users: channel[0].users,
				admins: channel[0].admins
			}
		});
	}

	async requestChannels(user: unknown) {
		console.log("User " + user[0].pseudo + " requested all channels.");

		const channels = await this.prisma.chatChannel.findMany({
			where: {
				OR: [
					{ owner:	user[0].pseudo,			},
					{ users:	{ has: user[0].pseudo,	}},
					{ admins:	{ has: user[0].pseudo,	}},
					{ type:		'Public',				},
					{ type:		'Protégé',				},
				]
			}
		});
		
		return channels;
	}

	async leaveChannel(infos: unknown) {
		console.log("User ID " + infos[0].userID + " leaved channel ID " + infos[0].channelID);

		const user = await this.prisma.userChannels.findFirst({
			where: {
				userID: infos[0].userID,
			}
		});

		let channelArray: number[] = user.channelsID;
		let index = channelArray.indexOf(infos[0].channelID);
		channelArray.splice(index, 1);

		await this.prisma.userChannels.update({
			where: {
				userID: infos[0].userID,
			},
			data: {
				channelsID: channelArray,
			}
		});
	}

	async joinChannel(infos: unknown) {
		console.log("User ID " + infos[0].userID + " joined channel ID " + infos[0].channelID);

		const user = await this.prisma.userChannels.findFirst({
			where: {
				userID: infos[0].userID,
			}
		});

		let channelArray: number[] = [];
		if (user) {
			channelArray = user.channelsID;
			if (channelArray.indexOf(infos[0].channelID) == -1)
				channelArray.push(infos[0].channelID);
		}
		else {
			channelArray.push(infos[0].channelID);
		}

		const channels = await this.prisma.userChannels.upsert({
			where: {
				userID: infos[0].userID,
			},
			update: {
				channelsID: channelArray,
			},
			create: {
				userID: infos[0].userID,
				channelsID: channelArray
			}
		});
		
		console.log(channels);

		return channels;
	}

	async requestMyChannels(userID: number) {
		console.log("User ID" + userID[0] + " requested all his channels.");

		const userChannelInfos = await this.prisma.userChannels.findMany({
			where: {
				userID: userID[0],
			}
		});
		
		console.log(userChannelInfos);

		let channelsToFind: number[] = userChannelInfos[0].channelsID;

		const channels = await this.prisma.chatChannel.findMany({
			where: {
				id: {in: channelsToFind},
			}
		})

		return channels;
	}

	async requestChannelMessages(channel: string) {
		//console.log("User requested messages from channel " + channel);
		const messages = await this.prisma.chatMessage.findMany({
			where: {
				channelName: channel[0],
			}
		});
		
		return messages;
	}

	async sendNewMessage(message: unknown) {
		console.log("User " + message[0].userPseudo + " send a new message:");
		console.log(message[0]);

		console.log(await this.prisma.chatChannel.findMany({}));

		let channelID = await this.prisma.chatChannel.findFirst({
			where: {
				name: message[0].channelName
			}
		});

		console.log("ChannelID: ", channelID);

		const newMessage = await this.prisma.chatMessage.create({
			data: {        
				userPseudo: message[0].userPseudo,
				userAvatar: message[0].userAvatar,
				text: message[0].text,
				date: message[0].date,
				channelName: message[0].channelName,
				chatChannelId: channelID.id
			}
		})

		return newMessage;
	}

	async deleteChannel(channelName: string) {
		console.log("Channel" + channelName[0] + " was deleted");

		const channel = await this.prisma.chatChannel.findFirst({
			where: {
				name: channelName[0],
			}
		});
		
		await this.prisma.chatChannel.delete({
			where: {
			  id: channel.id,
			},
		});

		await this.prisma.chatMessage.deleteMany({
			where: {
				channelName: channelName[0],
			}
		});
	}
}
