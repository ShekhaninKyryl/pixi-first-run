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

  get view() {
    return this._view;
  }
}
