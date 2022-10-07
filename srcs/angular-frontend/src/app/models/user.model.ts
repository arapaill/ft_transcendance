import { Injectable } from '@angular/core';
export class User {
	id!: number;
	pseudo!: string;
	avatar!: string;
	description !: string;
	friends!: string[];
	blacklist!: string[];
}
@Injectable()
export class myUser  {
	id : number = 0;
	pseudo : string = "";
	avatar : string ="";
	description : string ="";
	friends : string[] = [];
	blacklist : string[] = [];
}