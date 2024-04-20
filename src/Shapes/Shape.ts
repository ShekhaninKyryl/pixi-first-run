import { ColorSource, Graphics } from "pixi.js";

export abstract class Shape {
  abstract drawShape(color: ColorSource): Graphics;
}
