import {
  Color,
  ColorSource,
  Container,
  Graphics,
  Point,
  PointData,
  Ticker,
} from "pixi.js";
import { SheepView } from "./SheepView";
import { Hero } from "../Hero/Hero";
import { Farm } from "../Farm/Farm";

export type TSheepOption = {
  position: PointData;
  ticker?: Ticker;
};

export class Sheep {
  private _view?: Container;
  private followRadiusView?: Graphics;
  speed: number;
  followRadius: number;
  locked: boolean;
  killed: boolean;

  constructor({ position }: TSheepOption) {
    this._view = new SheepView({ position });
    this.speed = 1;
    this.followRadius = 30;
    this.locked = false;
    this.killed = false;
    this.followRadiusView = new Graphics();
    this._view.addChild(this.followRadiusView);

    this.drawFollowCircle("0xbbbbbb44");
  }

  private drawFollowCircle(color: ColorSource) {
    if (this._view && this.followRadiusView)
      this.followRadiusView
        .clear()
        .circle(
          this._view.x,
          this._view.y,
          this._view.width / 2 + this.followRadius,
        )
        .fill(color);
  }

  // moveToPoint(time: Ticker, position: PointData, finish: () => {}) {

  //   const sheepPosition = this._view.position;

  //   const dX = position.x - sheepPosition.x;
  //   const dY = position.y - sheepPosition.y;

  //   if (dX === 0 && dY === 0) {
  //     finish();
  //     return;
  //   }

  //   const ratioX = dX / Math.sqrt(dX ** 2 + dY ** 2);
  //   const ratioY = dY / Math.sqrt(dX ** 2 + dY ** 2);

  //   this._view.x += ratioX * this.speed * time.deltaTime;
  //   this._view.y += ratioY * this.speed * time.deltaTime;

  //   // remove trottling;
  //   const ndX = position.x - this._view.position.x;
  //   const ndY = position.y - this._view.position.y;
  //   if (dX * ndX < 0 || dY * ndY < 0) this.view.position = position;
  // }

  isTamed(hero: Hero) {
    if (this.locked || !this._view) return;
    const sheepPosition = this._view.position;
    const heroPosition = hero.view.position;

    const dX = heroPosition.x - sheepPosition?.x;
    const dY = heroPosition.y - sheepPosition?.y;
    const distance = Math.sqrt(dX ** 2 + dY ** 2);

    if (
      distance <
      hero.heroWidth / 2 + this._view.width / 2 + this.followRadius
    ) {
      return true;
    }
    return false;
  }

  assignToGroup(hero: Hero) {
    if (!this._view) return;
    console.log(hero.group.children.length);
    if (hero.group.children.length >= hero.maxGroupSize) return;
    const sheepPosition = this._view.position;
    const heroPosition = hero.view.position;

    const dX = sheepPosition.x - heroPosition.x;
    const dY = sheepPosition.y - heroPosition.y;

    hero.group.addChild(this._view);
    this._view.position.set(dX, dY);
    //this.kill();
    return this;
  }

  followHero(hero: Hero) {
    // todo: add logic to follow hero;
  }

  isInTheFarm(farm: Farm) {
    if (!this._view) return;
    const farmPosition = farm.view.position;
    const groupPosition = this._view.parent.parent.position;
    const sheepPosition = this._view;

    const dX = farmPosition.x - (groupPosition.x + sheepPosition.x);
    const dY = farmPosition.y - (groupPosition.y + sheepPosition.y);

    const isFitX = Math.abs(dX) < farm.view.width / 2;
    const isFitY = Math.abs(dY) < farm.view.height / 2;
    return isFitX && isFitY;
  }

  kill(resolve?: () => void) {
    if (!this._view || !this.followRadiusView) return;
    this.killed = true;
    this._view.destroy();
    this.followRadiusView.destroy();

    if (resolve) {
      resolve();
    }
    return;
  }

  lock() {
    this.locked = true;
    return this;
  }

  get view() {
    return this._view;
  }
}
