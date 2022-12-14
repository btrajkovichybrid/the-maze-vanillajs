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
  goals: [
    {
      x: 0,
      y: 4,
    },
    {
      x: 0,
      y: 10,
    },
    {
      x: 4,
      y: 2,
    },
    {
      x: 7,
      y: 5,
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
  maze.placeSprite("goals");

  let playerSprite = maze.placePlayer("player");
  // debugger;
  maze.player.el = playerSprite;

  maze.keyboardListener();
}

init();
