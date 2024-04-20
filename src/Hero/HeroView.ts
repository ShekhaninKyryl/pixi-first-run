import { Container, PointData } from "pixi.js";
import { Circle } from "../Shapes/Circle";

export type THeroViewOption = {
  position: PointData;
};

export class HeroView extends Container {
  constructor({ position }: THeroViewOption) {
    super();
    this.addChild(this.drawCircle(position.x, position.y, 0x880000).shape);
    this.pivot.set(position.x, position.y);
    this.position.set(position.x, position.y);
  }

  drawCircle = (x: number, y: number, color: number) => {
    const square = new Circle(color);
    square.shape.x = x;
    square.shape.y = y;
    square.shape.width = 20;
    square.shape.height = 20;

    return square;
  };
}
