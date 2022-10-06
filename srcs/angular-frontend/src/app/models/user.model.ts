import { Injectable } from '@angular/core';
export class User {
	id!: number;
	pseudo!: string;
	avatar!: string;
	description !: string;
	friends!: Map<string, number>;
	blacklist!: Map<string, number>;
}
@Injectable()
export class myUser  {
	id : number = 0;
	pseudo : string = "";
	avatar : string ="";
	description : string ="";
	friends : Map<string, number> = new Map();
	blacklist : Map<string, number> =new Map();
}