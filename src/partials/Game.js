import { SVG_NS, KEYS } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.pause = false;

		this.paddleWidth = 8;
		this.paddleHeight = 56;
		this.boardGap = 10;
		this.ballRadius = 8;
		this.scoreFontSize = 36;
		this.gameElement = document.getElementById(this.element);

		this.board = new Board(this.width, this.height);

		this.player1 = new Paddle(  //constructor call / tell game where we creating it
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			((this.height - this.paddleHeight) / 2),
			KEYS.p1up,
			KEYS.p1down,

		);

		this.player2 = new Paddle(  //constructor call / tell game where we creating it
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.boardGap - this.paddleWidth),
			((this.height - this.paddleHeight) / 2),

			KEYS.p2up,
			KEYS.p2down,

		);

		this.ball = new Ball(this.ballRadius, this.width, this.height);

		this.score1 = new Score(this.width /2 - 50 ,30, this.scoreFontSize);
		this.score2 = new Score(this.width /2 + 25 ,30, this.scoreFontSize);

		this.secondBall = new Ball(this.ballRadius, this.width, this.height);

		 document.addEventListener('keydown', event => { 
		    switch(event.key) {
			case KEYS.spaceBar:
			this.pause =!this.pause
           break;
            }
        });

	}

	render() {
		if(this.pause) { 
		return; 
		}
		//anything that will change - go to render method
		this.gameElement.innerHTML = '';
		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);

		this.board.render(svg);

		this.player1.render(svg);
		this.player2.render(svg);

		this.ball.render(svg, this.player1, this.player2);
		if (this.player1.getScore()  >= 2 || this.player2.getScore() >= 2 ) {
			this.secondBall.render(svg, this.player1, this.player2)
			this.vx *= -1.2;
		}
		


	 if (this.player1.getScore() === 8) { 
		this.score1.render(svg, "Player 1 Wins!"); // if replace ';' to  '&&' says player 1 wins and continues game
		this.score.render(svg); //p1 win and stops game -does not reset score
		// resetScore(svg, this.player1, this.player2); stops the game enttirely and says player1 wins
		

		
	 }		
	 else if (this.player2.getScore() === 8) {
			this.score2.render(svg, "Player 2 Wins!"); // if replace ';' to  '&&' says player 2 wins and continues
			this.score.render(svg); // p2 win and stops game = does not reset score
		    // resetScore(svg, this.player1, this.player2);// 
			
	} else {
		this.score1.render(svg, this.player1.getScore()); 
		this.score2.render(svg, this.player2.getScore());

	}
 }
}

	


