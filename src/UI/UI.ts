import { Button } from "@pixi/ui";
import { Container, PointData, Size, Text } from "pixi.js";

export type TFarmOption = {
  position: PointData;
  size: Size;
};

export class UI extends Container {
  private _score: number;
  private scoreView: Text;
  private resetButton?: Button;

  constructor() {
    super();
    this._score = 0;
    this.scoreView = new Text({
      text: `Score: ${this._score}`,
      style: {
        fontFamily: "Arial",
        fontSize: 36,
        fontStyle: "italic",
        fontWeight: "bold",
        stroke: { color: "#4a1850", width: 5, join: "round" },
        fill: "#ffffff",
        dropShadow: {
          color: "#000000",
          blur: 2,
          distance: 3,
        },
        wordWrap: true,
        wordWrapWidth: 440,
      },
    });
    this.scoreView.y = 10;
    this.scoreView.x = 10;

    this.addChild(this.scoreView);
  }

  set score(score: number) {
    this._score = score;
    this.scoreView.text = `Score: ${this.score}`;
  }

  get score() {
    return this._score;
  }
}
