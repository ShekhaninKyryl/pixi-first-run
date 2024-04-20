import { ColorSource, Graphics, Sprite } from "pixi.js";
import { Shape } from "./Shape";

export class Square extends Shape {
  private _square: Sprite;

  constructor(color: ColorSource) {
    super();
    this._square = new Sprite();
    this._square.addChild(this.drawShape(color));
  }

  drawShape(color: ColorSource): Graphics {
    return new Graphics().rect(0, 0, 1, 1).fill(color);
  }

  public get shape() {
    return this._square;
  }
}
