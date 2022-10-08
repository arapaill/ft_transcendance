import {ElementRef } from '@angular/core';

export class Pong {
	canvas: ElementRef;
	ctx: CanvasRenderingContext2D;

	constructor(canvas: ElementRef) {
	  this.canvas = canvas;
	  //console.log(canvas);
	  this.ctx = this.canvas.nativeElement.getContext('2d');
	  //console.log(this.ctx);
	}
}