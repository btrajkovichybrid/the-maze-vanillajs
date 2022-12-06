import { startQuiz } from "./quiz.js";
import Maze from "./maze.js";

let levels = [];
levels[0] = {
  map: [
    [1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0],
    [1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1],
    [0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1],
  ],
  player: {
    x: 0,
    y: 11,
  },
  goal: {
    x: 8,
    y: 0,
  },
  goals: [
    {
      x: 11,
      y: 3,
    },
    {
      x: 9,
      y: 3,
    },
    {
      x: 2,
      y: 4,
    },
    {
      x: 5,
      y: 7,
    },
    {
      x: 11,
      y: 0,
    },
  ],
  theme: "default",
};

function init() {
  let maze = new Maze("game-container-1", levels[0], startQuiz);
  maze.populateMap();
  maze.sizeUp();
  maze.placeSprite("goal");

  let playerSprite = maze.placeSprite("player");
  maze.player.el = playerSprite;

  maze.keyboardListener();
}

init();
