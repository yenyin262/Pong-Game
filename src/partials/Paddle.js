import {  SVG_NS } from '../settings';

export default class Paddle { 

constructor (boardHeight,width, height, x, y, up, down) { 
    this.boardHeight = boardHeight; 
    this.width = width; 
    this.height = height; 
    this.x = x; // passing in the 
    this.y = y; 
    this.up = up; 
    this.down = down; 

    this.speed = 10; 
    this.score = 0;
    document.addEventListener('keydown', event => { //whenever a key is pressed down.    
        switch(event.key) { 
            case this.up: 
            this.y = Math.max(0,this.y - this.speed); // max =  0 moves up by 10 px. 
            break; 
            case this.down:
            this.y = Math.min(this.boardHeight - this.height, this.y + this.speed); 
            break;

        }
      });

}

render(svg){ 

    let rect = document.createElementNS(SVG_NS, 'rect'); 
    rect.setAttributeNS(null, 'fill', 'white');
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'x', this.x);
    rect.setAttributeNS(null, 'y', this.y);
    svg.appendChild(rect)

  } 

}