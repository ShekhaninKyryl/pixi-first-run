import {
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
  isMoving: boolean;

  constructor({ position }: TSheepOption) {
    this._view = new SheepView({ position });
    this.speed = 1;
    this.followRadius = 30;
    this.locked = false;
    this.killed = false;
    this.isMoving = false;
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

  patrol(ticker: Ticker, position: PointData, farm: Farm, finish: () => void) {
    this.isMoving = true;

    const moveTickerCallback = () => {
      if (!this._view || this.locked) return;
      const sheepPosition = this._view.position;

      const dX = position.x - sheepPosition?.x;
      const dY = position.y - sheepPosition?.y;

      if (dX === 0 && dY === 0) {
        finish();
        ticker.remove(moveTickerCallback);
        return;
      }

      const ratioX = dX / Math.sqrt(dX ** 2 + dY ** 2);
      const ratioY = dY / Math.sqrt(dX ** 2 + dY ** 2);

      this._view.x += ratioX * this.speed * ticker.deltaTime;
      this._view.y += ratioY * this.speed * ticker.deltaTime;

      if (this.isInTheFarm(farm, 100)) {
        this._view.x -= ratioX * this.speed * ticker.deltaTime;
        this._view.y -= ratioY * this.speed * ticker.deltaTime;
        finish();
        ticker.remove(moveTickerCallback);
        return;
      }
      // remove trottling;
      const ndX = position.x - this._view.position.x;
      const ndY = position.y - this._view.position.y;
      if (dX * ndX < 0 || dY * ndY < 0) this._view.position = position;
    };

    ticker.add(moveTickerCallback);
    return moveTickerCallback;
  }

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
    if (!this._view || !this._view.parent || !this._view.parent.parent) return;

    // Extract positions
    const sheepPosition = this._view.position;
    const heroPosition = hero.view.position;
    const heroPrevPosition = hero.heroPrevPosition
      ? hero.heroPrevPosition
      : heroPosition;

    // Calculate distance between sheep position and group/hero position (local = 0,0)
    const distance = Math.sqrt(sheepPosition.x ** 2 + sheepPosition.y ** 2);

    // Calculate the threshold distance
    const thresholdDistance =
      hero.heroWidth / 2 + this._view.width / 2 + this.followRadius;

    const dx = heroPrevPosition.x - heroPosition.x;
    const dy = heroPrevPosition.y - heroPosition.y;

    console.log(dx);
    // Check if sheep is within threshold distance
    if (distance < thresholdDistance) {
      // Update sheep position to show sheep stable;

      console.log("distance<");

      this._view.x += dx;
      this._view.y += dy;
    } else {
      console.log("distance>");

      const magnitude = Math.sqrt(dx ** 2 + dy ** 2);
      const direction = new Point(dx / magnitude, dy / magnitude);

      // Calculate the new position based on speed
      const newPositionX = sheepPosition.x + direction.x * this.speed;
      const newPositionY = sheepPosition.y + direction.y * this.speed;

      // Update sheep position
      this._view.position.set(newPositionX, newPositionY);
    }
  }

  isInTheFarm(farm: Farm, deviation = 0) {
    if (!this._view) return;

    const groupPosition = this._view.parent.parent.position;
    const sheepPosition = this._view.position;

    return farm.isInTheFarm(
      groupPosition.x + sheepPosition.x,
      groupPosition.y + sheepPosition.y,
      deviation,
    );
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
