import { SVG_NS } from '../settings';

export default class Ball { 
    constructor(radius, width, height) {
    this.radius = radius; 
    this.boardWidth = width; 
    this.boardHeight = height; 

    this.reset(); //call reset method - when ball is created

    }
    reset() { 
     this.x = this.boardWidth / 2; 
     this.y = this.boardHeight /2; 

    }

    render(svg) {
        let circle = document.createElementNS(SVG_NS, 'circle');  //NS - namespace = creating element not a HTML element.
        circle.setAttributeNS(null, 'r', this.radius);
        circle.setAttributeNS(null,'cx', this.x); 
        circle.setAttributeNS(null,'cy', this.y);      
        circle.setAttributeNS(null,'fill', 'white'); //first property it takes is name space - dont need to reference when setting property
        svg.appendChild(circle);

    }

         


    
 }