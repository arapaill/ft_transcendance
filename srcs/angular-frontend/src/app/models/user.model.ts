export class User {
	id!: number;
	pseudo!: string;
	avatar!: string;
	description !: string;
	friends!: Map<string, number>;
	blacklist!: Map<string, number>;
}

export let myUser : User = {
	id : 0,
	pseudo : "cgoncalv",
	avatar : "assets/avatar-placeholder-1.png",
	description : "TEST",
	friends : new Map(),
	blacklist : new Map(),
}

