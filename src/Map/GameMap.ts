import { Container, Point, Size, Ticker, TickerCallback } from "pixi.js";
import { GameMapView } from "./GameMapView";
import { Hero } from "../Hero/Hero";
import { Farm } from "../Farm/Farm";
import { Sheep } from "../Sheep/Sheep";
import { UI } from "../UI/UI";

export type TGameMapOption = { size: Size; ui: UI };

export class GameMap {
  _view: Container;
  hero: Hero;
  farm: Farm;
  ui: UI;
  sheeps: Sheep[];
  maxSheepsPopulation: number;

  constructor({ size, ui }: TGameMapOption) {
    this._view = new GameMapView(size.width, size.height);
    this.hero = new Hero({
      position: { x: size.width / 2, y: size.height / 2 },
    });
    this.farm = new Farm({
      position: { x: size.width / 2, y: size.height / 2 },
      size: {
        width: 100,
        height: 200,
      },
    });

    this.ui = ui;
    this.sheeps = [];
    this.maxSheepsPopulation = 10;
    this.drawChild();

    for (let i = 0; i < this.maxSheepsPopulation; i++) {
      this.spawnSheep();
    }
  }

  private drawChild() {
    this._view.addChild(this.farm.view, this.hero.view);
  }

  private spawnSheep() {
    const sheep = new Sheep({
      position: this.getSafePosition(),
    });
    if (sheep.view) this._view.addChildAt(sheep.view, 2);
    this.sheeps.push(sheep);
  }

  /**
   *
   * @param time - use ticker last time;
   * @param modBase - increase value to reduce true chance
   * @returns
   */
  private randomByTime(time: number, modBase = 2) {
    return !Boolean(time % modBase);
  }

  private getSafePosition(): Point {
    const deviationX = (Math.random() - Math.random()) * (this._view.width / 2);
    const deviationY =
      (Math.random() - Math.random()) * (this._view.height / 2);
    const { x, y } = this._view;

    const spawnPos = new Point(x + deviationX, y + deviationY);
    return this.farm.isInTheFarm(
      spawnPos.x,
      spawnPos.y,
      this._view.height * 0.1,
    )
      ? this.getSafePosition()
      : spawnPos;
  }

  public subscribeForEvents(ticker: Ticker) {
    this._view.eventMode = "static";
    this._view.cursor = "pointer";

    const handlersMap = new Map();

    this._view.on("pointerdown", (event) => {
      const clickPoin = event.global.clone();

      const handlersTicker: TickerCallback<any>[] = [
        (ticker: Ticker) => {
          this.hero.moveToPoint(ticker, clickPoin, () =>
            ticker.remove(handlersTicker[0]),
          );
        },
      ];

      handlersTicker.map((hT, index) => {
        const originalFunction = handlersMap.get(`pointerdown_${index}`);

        if (originalFunction) {
          ticker.remove(originalFunction);
        }
        handlersMap.set(`pointerdown_${index}`, hT);
        ticker.add(hT);
      });
    });

    ticker.add(() => {
      const tamedSheeps = this.sheeps.map((s) => s.isTamed(this.hero));
      if (tamedSheeps.includes(true)) {
        tamedSheeps.forEach((value, index) => {
          if (!value) return;
          this.sheeps[index].assignToGroup(this.hero)?.lock();
        });
      }

      // TODO: fix disapearing sheeps
      // this.sheeps
      //   .filter((s) => s.locked)
      //   .forEach((s) => s.followHero(this.hero));
      this.hero.setPrevPoint();

      this.sheeps
        .filter((s) => !s.killed)
        .filter((s) => s.isInTheFarm(this.farm))
        .forEach((s) => s.kill(() => this.ui.score++));

      this.sheeps = this.sheeps.filter((s) => !s.killed);

      if (this.sheeps.length < this.maxSheepsPopulation) {
        if (this.randomByTime(ticker.lastTime, 20)) this.spawnSheep();
      }

      this.sheeps.forEach((sheep, index) => {
        if (
          !sheep.isMoving &&
          !sheep.locked &&
          !handlersMap.get(`sheep_motion_${index}`) &&
          this.randomByTime(ticker.lastTime, 5)
        ) {
          handlersMap.set(`sheep_motion_${index}`, true);
          const tickerCallback = sheep.patrol(
            ticker,
            this.getSafePosition(),
            this.farm,
            () => {
              sheep.isMoving = false;
              handlersMap.delete(`sheep_motion_${index}`);
            },
          );
          if (sheep.locked) ticker.remove(tickerCallback);
        }
      });
    });
  }

  get view() {
    return this._view;
  }
}
