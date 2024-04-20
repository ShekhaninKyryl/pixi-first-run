import { Container, PointData, Size, Ticker } from "pixi.js";
import { FarmView } from "./FarmView";

export type TFarmOption = {
  position: PointData;
  size: Size;
  ticker?: Ticker;
};

export class Farm {
  private _view: Container;

  constructor(option: TFarmOption) {
    this._view = new FarmView(option);
  }

  isInTheFarm(x: number, y: number, deviation = 0) {
    if (!this._view) return;
    const farmPosition = this.view.position;

    const dX = farmPosition.x - x;
    const dY = farmPosition.y - y;

    const isFitX = Math.abs(dX) - deviation < this.view.width / 2;
    const isFitY = Math.abs(dY) - deviation < this.view.height / 2;
    return isFitX && isFitY;
  }

  get view() {
    return this._view;
  }
}
