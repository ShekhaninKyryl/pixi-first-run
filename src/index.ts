import { Application } from "pixi.js";
import {} from "@pixi/ui";
import { GameMap } from "./Map/GameMap";
import { Hero } from "./Hero/Hero";
import { Farm } from "./Farm/Farm";
import { UI } from "./UI/UI";

// Asynchronous IIFE
(async () => {
  // Create a PixiJS application.
  const app = new Application();

  // Intialize the application.
  await app.init({ background: "#1099bb", resizeTo: window });
  //@ts-ignore
  globalThis.__PIXI_APP__ = app;
  // Then adding the application's canvas to the DOM body.
  document.body.appendChild(app.canvas);
  app.stage.hitArea = app.screen;

  const ui = new UI();
  const map = new GameMap({
    size: { width: app.screen.width, height: app.screen.height },
    ui,
  });
  map.subscribeForEvents(app.ticker);

  app.stage.addChild(map.view, ui);
})();
