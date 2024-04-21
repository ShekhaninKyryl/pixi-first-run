![Code Bugs Crutches](https://github.com/ShekhaninKyryl/pixi-first-run/blob/main/images/code_bugs_crutches.jpeg)

# Animal Collector Mini-Game Prototype

## Description

Welcome to the Animal Collector mini-game prototype! In this 2D game, players take on the role of the Main Hero, tasked with collecting animals scattered across the game field and guiding them to the designated destination point, the yard.

## Gameplay Overview

- **Game Field**: Players are presented with a green game field representing the environment where the action takes place.
- **Main Hero**: The Main Hero is represented by a red circle, controlled by the player.
- **Animals**: Randomly placed white circles represent the animals scattered across the game field. The player's objective is to collect these animals.
- **Destination Point (Yard)**: A yellow area serves as the destination point, where the collected animals must be guided.
- **Score Counter**: A score value is displayed at the top UI, indicating the player's progress in collecting animals.
- **Interaction**: Players can interact with the game field by clicking on it. The Main Hero will move to the clicked position.
- **Grouping**: When the Main Hero moves close to an animal, it will follow the Main Hero, forming a group. The maximum number of animals that can be in a group is 5.
- **Scoring**: When an animal reaches the yard, the score counter increases, indicating a successful collection.

## How to Play

1. Launch the application to start the game.
2. Use mouse clicks to navigate the Main Hero to different positions on the game field.
3. Collect animals by moving the Main Hero close to them. Animals will join the Main Hero in a group.
4. Guide the grouped animals to the yard (destination point) to increase your score.
5. Enjoy collecting as many animals as possible within the game session!

## Different versions:

- `main` - main branch;
- `v1` - minimal functionalities (AC);
- `v2` - improve functionalities (Additional)

## Used technologies

- JavaScript,
- TypeScript,
- Pixi.js,

## To start:

```bash
npm install
npm run dev
```

This command installs the necessary dependencies for the project and starts the development server. After running these commands, open http://localhost:9000 in your web browser to view the project.
