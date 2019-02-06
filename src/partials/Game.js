import { SVG_NS, KEYS, PADDLEWIDTH, BOARDGAP, PADDLE_HEIGHT, BALL_RADIUS, SCORE_FONT_SIZE } from '../settings';
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

		this.gameOn = new Audio('public/sounds/01 Another Day Of Sun (From _La La Land_ Soundtrack).mp3');
		this.gameOver = false;
		this.gameElement = document.getElementById(this.element);

		this.board = new Board(this.width, this.height);

		this.player1 = new Paddle(  
			this.height,
			PADDLEWIDTH,
			PADDLE_HEIGHT,
			BOARDGAP,
			((this.height - PADDLE_HEIGHT) / 2),
			KEYS.p1up,
			KEYS.p1down,

		);

		this.player2 = new Paddle(  
			this.height,
			PADDLEWIDTH,
			PADDLE_HEIGHT,
			(this.width - BOARDGAP - PADDLEWIDTH),
			((this.height - PADDLE_HEIGHT) / 2),

			KEYS.p2up,
			KEYS.p2down,

		);

		this.ball = new Ball(BALL_RADIUS, this.width, this.height, 'white');
		this.secondBall = new Ball(10, this.width, this.height, 'red');
		this.thirdBall = new Ball(12, this.width, this.height, 'blue');

		this.score1 = new Score(this.width / 2 - 50, 30, SCORE_FONT_SIZE);
		this.score2 = new Score(this.width / 2 + 25, 30, SCORE_FONT_SIZE);

		document.addEventListener('keydown', event => {
			switch (event.key) {
				case KEYS.spaceBar:
					if (this.gameOver) {
						this.player1.resetScore();
						this.player2.resetScore();
						this.player1.resetPaddleHeight();
						this.player2.resetPaddleHeight();
						this.gameOver = false;
						
					}
					this.gameOn.pause()
					this.pause = !this.pause;
					break;

				case KEYS.reset:
					this.player1.resetScore();
					this.player2.resetScore();
					this.player1.resetPaddleHeight();
					this.player2.resetPaddleHeight();
					this.gameOver = false;
					break;

			}
		});

	}

	render() {
		if (this.pause) {
			return;
		}
		this.gameOn.play();

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

		if (this.player1.getScore() >= 5 || this.player2.getScore() >= 5) {
			this.secondBall.render(svg, this.player1, this.player2);
			this.vx *= -1.3;
		}
		
		if (this.player1.getScore() >= 10 || this.player2.getScore() >= 10) {
			this.thirdBall.render(svg, this.player1, this.player2);
			this.vx *= -1.5;
		}

		if (this.player1.getScore() >= 8 ) {
			this.player1.decreasePaddleHeight();
		}

		 if (this.player2.getScore() >= 8) {
			this.player2.decreasePaddleHeight();
		}

		if (this.player1.getScore() === 15) {
			this.score1.render(svg, 'Player 1 Wins!');
			this.pause = true;
			this.gameOver = true;
			this.gameOn.pause();
		}
		else if (this.player2.getScore() === 15) {
			this.score2.render(svg, 'Player 2 Wins!');
			this.pause = true;
			this.gameOver = true;
			this.gameOn.pause();
		} 
		else {
			this.score1.render(svg, this.player1.getScore());
			this.score2.render(svg, this.player2.getScore());
		}
	}

}


