import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
	/*constructor(private prisma: PrismaService) {}

	async createNewChannel(channel: unknown) {
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

	async requestChannels(user: string) {
		const channels = await this.prisma.chatChannel.findMany({
			where: {
				owner: user[0],
			}
		});
		
		console.log(channels);
		return channels;
	}

	async requestChannelMessages(channel: string) {
		const messages = await this.prisma.chatMessage.findMany({
			where: {
				channelName: channel[0],
			}
		});
		
		console.log(messages);
		return messages;
	}

	async sendNewMessage(message: unknown) {
		const channelID = await this.prisma.chatChannel.findFirst({
			where: {
				name: message[0].channelName
			}
		});

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
		console.log(channelName);
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
	}*/
}
