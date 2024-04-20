import { Container, PointData } from "pixi.js";
import { Circle } from "../Shapes/Circle";

export type TSheepViewOption = {
  position: PointData;
};

export class SheepView extends Container {
  constructor({ position }: TSheepViewOption) {
    super();
    this.addChild(this.drawCircle(position.x, position.y, 0xffffff).shape);
    this.pivot.set(position.x, position.y);
    this.position.set(position.x, position.y);
  }

  drawCircle = (x: number, y: number, color: number) => {
    const square = new Circle(color);
    square.shape.x = x;
    square.shape.y = y;
    square.shape.width = 15;
    square.shape.height = 15;

    return square;
  };
}
