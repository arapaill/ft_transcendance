import { ConsoleLogger, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
	constructor(private prisma: PrismaService) {}

	async createNewChannel(channel: object) {
		console.log("New channel created: " + channel[0].name);
		console.log(channel[0]);
		const newChannel = await (this.prisma.chatChannel.create({
			data: {
				name: channel[0].name,
				owner: channel[0].owner,
				type: channel[0].type,
				users: channel[0].users,
				admins: channel[0].admins,
				password: channel[0].password,
				usersBanned: [],
				usersKicked: [],
				usersMuted: [],
			}
		}))

		let alreadyAdded: boolean = false;

		if (channel[0].admins) {
			for (let admins of channel[0].admins) {
				let user = await this.prisma.user.findFirst({
					where: {
						name: admins,
					}
				});

				let userInfo = await this.prisma.userChannels.findFirst({
					where: {
						userID: user.id,
					}
				})

				console.log("USER: ", userInfo)

				let channelArray = userInfo.channelsID ? userInfo.channelsID : [];
				let channelID = await this.prisma.chatChannel.findFirst({
					where: {
						name: channel[0].name,
					}
				})
				channelArray.push(channelID.id);

				await this.prisma.userChannels.update({
					where: {
						userID: user.id,
					},
					data: {
						channelsID: channelArray,
					}
				})
				alreadyAdded = true;
			}
		}

		if (channel[0].users) {
			for (let users of channel[0].users) {
				let user = await this.prisma.user.findFirst({
					where: {
						name: users,
					}
				});

				let userInfo = await this.prisma.userChannels.findFirst({
					where: {
						userID: user.id,
					}
				})

				let channelArray = userInfo.channelsID ? userInfo.channelsID : [];
				let channelID = await this.prisma.chatChannel.findFirst({
					where: {
						name: channel[0].name,
					}
				})
				channelArray.push(channelID.id);

				if (alreadyAdded == false) {
					await this.prisma.userChannels.update({
						where: {
							userID: user.id,
						},
						data: {
							channelsID: channelArray,
						}
					})
				}
			}
		}
		

		return newChannel;
	}

	async updateChannel(channel: any) {
		console.log("Updating channel " + channel[0].name);

		const channelInfos = this.prisma.chatChannel.findFirst({
			where: {
				id: channel.id,
			}
		});

		let usersArray = channelInfos[0].users;
		let adminsArray = channelInfos[0].admins;

		for (const user of channel[0].users) {
			if (channelInfos[0].users.indexOf(user) == -1) {
				let cUser = await this.prisma.user.findFirst({
					where: {
						name: user,
					}
				});
				usersArray.push(cUser.id);
			}
		}

		for (const admin of channel[0].admins) {
			if (channelInfos[0].admins.indexOf(admin) == -1) {
				let cAdmin = await this.prisma.user.findFirst({
					where: {
						name: admin,
					}
				});
				adminsArray.push(cAdmin.name);
			}
		}

		await this.prisma.chatChannel.update({
			where: {
				name: channel[0].name,
			},
			data: {
				users: usersArray,
				admins: adminsArray,
				usersBanned: channel[0].usersBanned,
				usersKicked: channel[0].usersKicked,
				usersMuted: channel[0].usersMuted,
			}
		});
	}

	async requestChannels(user: unknown) {
		console.log("User " + user[0].pseudo + " requested all channels.");

		const channels = await this.prisma.chatChannel.findMany({});

		return channels;
	}

	async leaveChannel(infos: unknown) {
		if (infos[0].channelID == 0)
			return ;
		console.log("User ID " + infos[0].userID + " leaved channel ID " + infos[0].channelID);

		const user = await this.prisma.userChannels.findFirst({
			where: {
				userID: infos[0].userID,
			}
		});

		const channel = await this.prisma.chatChannel.findFirst({
			where: {
				id: infos[0].channelID,
			}
		})

		let usersArray = channel.users;
		let adminsArray = channel.admins;
		let index: number;

		index = usersArray.indexOf(infos[0].userID);
		if (index != -1)
			usersArray.splice(index, 1);

		index = adminsArray.indexOf(infos[0].userID);

		if (index != -1)
			adminsArray.splice(index, 1);

		let channelArray: number[] = user.channelsID;
		index = channelArray.indexOf(infos[0].channelID);
		channelArray.splice(index, 1);

		await this.prisma.userChannels.update({
			where: {
				userID: infos[0].userID,
			},
			data: {
				channelsID: channelArray,
			}
		});

		await this.prisma.chatChannel.update({
			where: {
				id: infos[0].channelID,
			},
			data: {
				users: usersArray,
				admins: adminsArray
			}
		})
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

		const channel = await this.prisma.chatChannel.findFirst({
			where: {
				id: infos[0].channelID
			}
		})

		let myUser = await this.prisma.user.findFirst({
			where: {
				id: infos[0].id,
			}
		})

		let userArray: string[] = channel.users

		if (userArray.indexOf(myUser.name) == -1)
			userArray.push(myUser.name);
		
		await this.prisma.chatChannel.update({
			where: {
				id: infos[0].channelID
			},
			data: {
				users: userArray,
			}
		})
	}

	async requestMyChannels(userID: number) {
		console.log("User ID" + userID[0] + " requested all his channels.");

		let userChannelInfos = await this.prisma.userChannels.findMany({
			where: {
				userID: userID[0],
			}
		});

		console.log(userChannelInfos);
		if (!userChannelInfos[0]) {
			console.log('Hey');
			await this.prisma.userChannels.create({
				data: {
					userID: userID[0],
					channelsID: [0],
				}
			});

			userChannelInfos = await this.prisma.userChannels.findMany({
				where: {
					userID: userID[0],
				}
			});
		}

		let channelsToFind: number[] = userChannelInfos[0].channelsID;

		let userPseudo: string;

		let user = await this.prisma.user.findFirst({
			where: {
				id: userID[0],
			},
		});

		userPseudo = user.name;

		const channels = await this.prisma.chatChannel.findMany({
			where: {
				OR: [
				{
					id: {in: channelsToFind},
				},
				{
					type: 'Privé',
					users: {has: userPseudo},
				},
				{
					type: 'Privé',
					admins: {has: userPseudo}
				},
			]}
		});

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

		let id = channelID ? channelID.id : 0

		console.log('id: ', id);

		const newMessage = await this.prisma.chatMessage.create({
			data: {        
				userPseudo: message[0].userPseudo,
				userAvatar: message[0].userAvatar,
				userID: message[0].userID,
				text: message[0].text,
				date: message[0].date,
				channelName: message[0].channelName,
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

		for (let user in channel.users) {
			let userInfos = await this.prisma.user.findFirst({
				where: {
					name: user,
				}
			});
			
			if (userInfos) {
				await this.leaveChannel({
					userID: userInfos.id,
					channelID: channel.id
				});
			}
		}

		for (let admin in channel.admins) {
			let userInfos = await this.prisma.user.findFirst({
				where: {
					name: admin,
				}
			});

			if (userInfos) {
				await this.leaveChannel({
					userID: userInfos.id,
					channelID: channel.id
				});
			}
		}
		
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

	async muteUser(infos: object) {
		let channel = await this.prisma.chatChannel.findFirst({
			where: {
				id: infos[0].channelID,
			}
		})

		let usersArray: number[] = channel ? channel.usersMuted : [];
		let index = usersArray.indexOf(infos[0].userID)
		if (index == -1) {
			console.log("User ID " + infos[0].userID + " was muted from channel ID " + infos[0].channelID);
			usersArray.push(infos[0].userID);
		}
		else {
			console.log("User ID " + infos[0].userID + " was demuted from channel ID " + infos[0].channelID);
			usersArray.splice(index, 1);
		};
	
		await this.prisma.chatChannel.update({
			where: {
				id: infos[0].channelID,
			},
			data: {
				usersMuted: usersArray,
			}
		});
	}

	async banUser(infos: object) {
		let newChannel = await this.prisma.chatChannel.findFirst({
			where: {
				id: infos[0].channelID,
			}
		})

		let usersArray: number[] = newChannel ? newChannel.usersBanned : [];
		let index = usersArray.indexOf(infos[0].userID)
		if (index == -1) {
			console.log("User ID " + infos[0].userID + " was banned from channel ID " + infos[0].channelID);
			usersArray.push(infos[0].userID);
		}
		else {
			console.log("User ID " + infos[0].userID + " was unbanned from channel ID " + infos[0].channelID);
			usersArray.splice(index, 1);
		};

		console.log(usersArray);

		await this.prisma.chatChannel.update({
			where: {
				id: infos[0].channelID,
			},
			data: {
				usersBanned: usersArray,
			}
		});

		let truc = await this.prisma.chatChannel.findFirst({
			where: {
				id: infos[0].channelID,
			}
		})

		console.log(truc);

		const user = await this.prisma.userChannels.findFirst({
			where: {
				userID: infos[0].userID,
			}
		});
	
		const channel = await this.prisma.chatChannel.findFirst({
			where: {
				id: infos[0].channelID,
			}
		});

		const userInfos = await this.prisma.user.findFirst({
			where: {
				id: infos[0].userID,
			}
		})
	
		let channelArray: number[] = user.channelsID;
		index = channelArray.indexOf(infos[0].channelID);
		channelArray.splice(index, 1);
	
		let usersArrayString: string[] = channel.users;
		let adminsArray: string[] = channel.admins;
	
		index = usersArrayString.indexOf(userInfos.name);
		if (index == -1)
			usersArrayString.splice(index, 1);
	
		index = adminsArray.indexOf(userInfos.name);
		if (index == -1)
			adminsArray.splice(index, 1);
	
		await this.prisma.userChannels.update({
			where: {
				userID: infos[0].userID,
			},
			data: {
				channelsID: channelArray,
			}
		});
	
		await this.prisma.chatChannel.update({
			where: {
				id: infos[0].channelID,
			},
			data: {
				users: usersArrayString,
				admins: adminsArray,
			}
		});
	}

	async kickUser(infos: object) {

	console.log("ChannelID: ", infos[0].channelID)
	
	const user = await this.prisma.userChannels.findFirst({
		where: {
			userID: infos[0].userID,
		}
	});

	const channel = await this.prisma.chatChannel.findFirst({
		where: {
			id: infos[0].channelID,
		}
	});

	console.log(channel);

	let channelArray: number[] = user.channelsID;
	let index = channelArray.indexOf(infos[0].channelID);
	channelArray.splice(index, 1);

	let usersArray: string[] = channel.users;
	let adminsArray: string[] = channel.admins;

	let userInfos = await this.prisma.user.findFirst({
		where: {
			id: infos[0].userID,
		}
	});

	index = usersArray.indexOf(userInfos.name);
	if (index != -1)
		usersArray.splice(index, 1);

	index = adminsArray.indexOf(userInfos.name);
	if (index != -1)
		adminsArray.splice(index, 1);

	await this.prisma.userChannels.update({
		where: {
			userID: infos[0].userID,
		},
		data: {
			channelsID: channelArray,
		}
	});

	await this.prisma.chatChannel.update({
		where: {
			id: infos[0].channelID,
		},
		data: {
			users: usersArray,
			admins: adminsArray,
		}
	});
	}
}