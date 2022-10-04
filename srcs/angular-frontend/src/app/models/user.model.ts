export class User {
	id!: number;
	pseudo!: string;
	avatar!: string;
	description !: string;
	friends!: string[];
	blacklist!: string[];
}

export let myUser : User = {
	id : 0,
	pseudo : "Tester",
	avatar : "assets/avatar-placeholder-1.png",
	description : "TEST",
	friends : [],
	blacklist : [],
}

