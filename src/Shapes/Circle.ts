import { ColorSource, Graphics, Sprite } from "pixi.js";
import { Shape } from "./Shape";

export class Circle extends Shape {
  private _circle: Sprite;

  constructor(color: ColorSource) {
    super();
    this._circle = new Sprite();
    this._circle.addChild(this.drawShape(color));
  }

  drawShape(color: ColorSource): Graphics {
    return new Graphics().circle(0, 0, 1).fill(color);
  }

  public get shape() {
    return this._circle;
  }
}
