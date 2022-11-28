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
    x: 11,
    y: 0,
  },
  theme: "default",
};

function Game(id, level) {
  this.el = document.getElementById(id);
  this.tileTypes = ["Floor", "wall"];
  //   tile dimensions in pixels
  this.tileDim = 52;
  this.map = level.map;
  this.theme = level.theme;
  this.player = { ...level.player };
  this.goal = { ...level.goal };
  this.player.el = null;
}

Game.prototype.populateMap = function () {
  this.el.className = `game-container ${this.theme}`;
  let tiles = document.getElementById("tiles");
  for (var y = 0; y < this.map.length; ++y) {
    for (var x = 0; x < this.map[y].length; ++x) {
      // current tile
      let tileCode = this.map[y][x];
      let tileType = this.tileTypes[tileCode];
      // Creating and adding tile
      let tile = this.createEl(x, y, tileType);
      tiles.appendChild(tile);
    }
  }
};

Game.prototype.createEl = function (x, y, type) {
  //   debugger;
  let el = document.createElement("div");
  el.className = type;
  //   Set the width and height of our tile or sprite element
  el.style.width = el.style.height = `${this.tileDim}px`;
  el.style.left = `${x * this.tileDim}px`;
  el.style.top = `${y * this.tileDim}px`;

  return el;
};

Game.prototype.sizeUp = function () {
  let map = this.el.querySelector(".game-map");
  map.style.height = this.map.length * this.tileDim + "px";
  map.style.width = this.map[0].length * this.tileDim + "px";
};

Game.prototype.placeSprite = function (type) {
  let x = this[type].x;
  let y = this[type].y;
  let sprite = this.createEl(x, y, type);
  sprite.id = type;
  // sprite.style.borderRadius = this.tileDim + "px";
  let layer = this.el.querySelector("#sprites");
  layer.appendChild(sprite);
  return sprite;
};

Game.prototype.movePlayer = function (event) {
  event.preventDefault();

  if (event.keyCode < 37 || event.keyCode > 40) {
    return;
  }

  switch (event.keyCode) {
    case 37:
      this.moveLeft();
      break;

    case 38:
      this.moveUp();
      break;

    case 39:
      this.moveRight();
      break;

    case 40:
      this.moveDown();
      break;
  }
};

Game.prototype.keyboardListener = function () {
  console.log("firstdsadsds");
  document.addEventListener("keydown", (event) => {
    this.movePlayer(event);
    this.checkGoal();
  });
};

Game.prototype.moveUp = function () {
  if (this.player.y == 0) {
    return;
  }

  let nextTile = this.map[this.player.y - 1][this.player.x];
  if (nextTile == 1) {
    return;
  }

  this.player.y -= 1;
  this.updateVert();
};

Game.prototype.moveDown = function () {
  if (this.player.y == this.map.length - 1) {
    return;
  }

  let nextTile = this.map[this.player.y + 1][this.player.x];
  if (nextTile == 1) {
    return;
  }

  this.player.y += 1;
  this.updateVert();
};

Game.prototype.moveLeft = function (sprite) {
  if (this.player.x == 0) {
    return;
  }

  let nextTile = this.map[this.player.y][this.player.x - 1];
  if (nextTile == 1) {
    return;
  }

  this.player.x -= 1;
  this.updateHoriz(sprite);
};

Game.prototype.moveRight = function (sprite) {
  if (this.player.x == this.map[this.player.y].length - 1) {
    return;
  }

  let nextTile = this.map[this.player.y][this.player.x + 1];
  if (nextTile == 1) {
    return;
  }

  this.player.x += 1;
  this.updateHoriz(sprite);
};

// Vertical update
Game.prototype.updateVert = function () {
  console.log(this.player, "PLAYER VER");
  this.player.el.style.top = this.player.y * this.tileDim + "px";
};

// horizontal update
Game.prototype.updateHoriz = function (sprite) {
  console.log(this.player, "PLAYER HOR");
  this.player.el.style.left = this.player.x * this.tileDim + "px";
};

Game.prototype.checkGoal = function (instrux_msg, goal_msg) {
  let body = document.querySelector("body");
  let txt = this.el.querySelector(".text");
  if (this.player.y == this.goal.y && this.player.x == this.goal.x) {
    // add success class to the body
    body.className = "success";
  } else {
    // remove success class from body
    body.className = "";
  }
};

function init() {
  let myGame = new Game("game-container-1", levels[0]);
  myGame.populateMap();
  myGame.sizeUp();
  myGame.placeSprite("goal");

  // capture element in variable
  let playerSprite = myGame.placeSprite("player");
  // assign playerSprite to the player's el property
  myGame.player.el = playerSprite;

  myGame.keyboardListener();
}
init();
