import { SVG_NS, KEYS } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;

		this.gameElement = document.getElementById(this.element); // getting this.element = <div> game</div>
		   
	

		this.paddleWidth = 8; 
		this.paddleHeight = 56; 
		this.boardGap = 10; 
		this.ballRadius = 8; 
		this.gameElement = document.getElementById(this.element);

		this.board = new Board(this.width, this.height);

		this.player1 = new Paddle (  //constructor call / tell game where we creating it
			this.height, 
			this.paddleWidth,
			this.paddleHeight, 
			this.boardGap, 
			((this.height - this.paddleHeight) /2), 
			KEYS.p1up, 
			KEYS.p1down,

		);

		this.player2 = new Paddle (  //constructor call / tell game where we creating it
			this.height, 
			this.paddleWidth,
			this.paddleHeight, 
			(this.width - this.boardGap - this.paddleWidth),
			((this.height - this.paddleHeight) / 2), 
		
			KEYS.p2up,
			KEYS.p2down,

		);

		this.ball = new Ball(this.ballRadius, this.width, this.height);

	}

	render() {
		
		//anything that will change - go to render method
		this.gameElement.innerHTML ='';   
		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);

		this.board.render(svg); 

		this.player1.render(svg);
		this.player2.render(svg);

		this.ball.render(svg); 
		// this.score1.render(svg); 
		// this.score2.render(svg);
	}

} 

// Other code goes here...

// 		const ball = new Ball(startXpos, startYPos);
//         const paddle1 = new paddle1(controlUp, controlDown, x, y, width, height);
// 		const paddle2 = new paddle2(controlUp1, controlDown1, x1, y1, width, height);
// 		const board = new Board(width, height);
// 		let svg = document.createElementNS(SVG_NS, "svg");
// svg.setAttributeNS(null, "width", this.width);
// svg.setAttributeNS(null, "height", this.height);
// svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);

// this.gameElement ='';
// this.gameElement.appendChild(this.gameElement);