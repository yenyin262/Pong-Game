import {  SVG_NS } from '../settings';

export default class Paddle { 

constructor (boardHeight,width, height, x, y, up, down) { 
    this.boardHeight = boardHeight; 
    this.width = width; 
    this.height = height; 
    this.x = x; 
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

increaseScore() { 
    this.score += 1;
}

getScore() { 
    return this.score;
}

coordinates(){
const leftX = this.x; 
const rightX = this.x + this.width;
const topY = this.y;
const bottomY = this.y + this.height; 
return [leftX, rightX, topY, bottomY];

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