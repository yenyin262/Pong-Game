import './styles/game.css';
import Game from './partials/Game'

// create a game instance
const game = new Game('game', 512, 256); // (html id, boardwidth, board-height)

(function gameLoop() {
    game.render();   
    requestAnimationFrame(gameLoop);   //build-in functionality animate object. get new frame
})();
