import { Injectable } from '@angular/core';
export class User {
	id!: number;
	pseudo!: string;
	avatar!: string;
	description !: string;
	friends!: number[];
	blacklist!: number[];
}
@Injectable()
export class myUser  {
	id : number = 0;
	pseudo : string = "";
	avatar : string ="";
	description : string ="";
	friends : number[] = [];
	blacklist : number[] = [];
	qr : string = "";
}