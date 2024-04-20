import { Container } from "pixi.js";
import { Square } from "../Shapes/Square";
import { Circle } from "../Shapes/Circle";

export class GameMapView extends Container {
  constructor(width: number, height: number) {
    super();
    this.addChild(this.drawSquare(width, height, 0x8cab80).shape);
    this.pivot.set(width / 2, height / 2);
    this.position.set(width / 2, height / 2);
  }

  drawSquare = (width: number, height: number, color: number) => {
    const square = new Square(color);
    square.shape.pivot.set(0.5);
    square.shape.x = width / 2;
    square.shape.y = height / 2;
    square.shape.width = width - 200;
    square.shape.height = height - 200;

    return square;
  };

  drawCircle = (width: number, height: number, color: number) => {
    const square = new Circle(color);
    square.shape.x = width / 2;
    square.shape.y = height / 2;
    square.shape.width = width / 2;
    square.shape.height = height / 2;
    return square;
  };
}
