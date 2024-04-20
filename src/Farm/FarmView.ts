import { Container, PointData, Size } from "pixi.js";
import { Square } from "../Shapes/Square";
import { Circle } from "../Shapes/Circle";

export type TFarmViewOption = {
  position: PointData;
  size: Size;
};

export class FarmView extends Container {
  constructor({ position, size }: TFarmViewOption) {
    super();
    this.addChild(this.drawSquare(0xfabd05, { position, size }).shape);
    this.pivot.set(position.x, position.y);
    this.position.set(position.x, position.y);
  }

  drawSquare = (color: number, { position, size }: TFarmViewOption) => {
    const square = new Square(color);
    square.shape.pivot.set(0.5);
    square.shape.x = position.x;
    square.shape.y = position.y;
    square.shape.width = size.width;
    square.shape.height = size.height;

    return square;
  };
}
