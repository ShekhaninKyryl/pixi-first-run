import { Container, PointData, Ticker } from "pixi.js";
import { HeroView } from "./HeroView";

export type THeroOption = {
  position: PointData;
  ticker?: Ticker;
};

export class Hero {
  private _view: Container;
  group: Container;
  maxGroupSize: number;
  speed: number;

  constructor({ position }: THeroOption) {
    this._view = new HeroView({ position });
    this.group = new Container({ isRenderGroup: true, position });
    this._view.addChild(this.group);
    this.maxGroupSize = 5;
    this.speed = 4;
  }

  get heroWidth() {
    return this._view.children[0].width;
  }

  moveToPoint(time: Ticker, position: PointData, cb: () => {}) {
    const heroPosition = this._view.position;

    const dX = position.x - heroPosition.x;
    const dY = position.y - heroPosition.y;

    if (dX === 0 && dY === 0) {
      cb();
      return;
    }

    const ratioX = dX / Math.sqrt(dX ** 2 + dY ** 2);
    const ratioY = dY / Math.sqrt(dX ** 2 + dY ** 2);

    this._view.x += ratioX * this.speed * time.deltaTime;
    this._view.y += ratioY * this.speed * time.deltaTime;

    // remove trottling;
    const ndX = position.x - this._view.position.x;
    const ndY = position.y - this._view.position.y;
    if (dX * ndX < 0 || dY * ndY < 0) this.view.position = position;
  }

  get view() {
    return this._view;
  }
}
