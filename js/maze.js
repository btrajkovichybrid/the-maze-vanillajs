export default class Maze {
  constructor(id, level, initQuiz) {
    this.el = document.getElementById(id);
    this.tileTypes = ["floor", "wall"];
    this.level = level;
    this.tileDim = 52;
    this.map = level.map;
    this.theme = level.theme;
    this.player = { ...level.player };
    this.goals = [...level.goals];
    this.player.el = null;
    this.initQuiz = initQuiz;
    this.overlay = document.getElementById("overlay");
  }

  populateMap() {
    this.el.className = `game-container ${this.theme}`;
    let tiles = document.getElementById("tiles");
    for (var y = 0; y < this.map.length; ++y) {
      for (var x = 0; x < this.map[y].length; ++x) {
        // current tile
        let tileCode = this.map[y][x];
        let tileType = this.tileTypes[tileCode];
        // Creating and adding tile
        let tile = this.createElement(x, y, tileType);
        tiles.appendChild(tile);
      }
    }
  }

  sizeUp() {
    let map = this.el.querySelector(".game-map");
    map.style.height = this.map.length * this.tileDim + "px";
    map.style.width = this.map[0].length * this.tileDim + "px";
  }

  createElement(x, y, type) {
    let el = document.createElement("div");
    el.className = type;
    //   Set the width and height of our tile or sprite element
    el.style.width = el.style.height = `${this.tileDim}px`;
    el.style.left = `${x * this.tileDim}px`;
    el.style.top = `${y * this.tileDim}px`;

    return el;
  }

  placeSprite(type) {
    let layer = this.el.querySelector("#sprites");

    this[type]?.map((el, index) => {
      let x = el.x;
      let y = el.y;
      let sprite = this.createElement(x, y, type);
      sprite.id = `${type}__${index}`;
      layer.appendChild(sprite);
    });
  }

  placePlayer(type) {
    let x = this[type].x;
    let y = this[type].y;
    let sprite = this.createElement(x, y, type);
    sprite.id = type;
    let layer = this.el.querySelector("#sprites");
    layer.appendChild(sprite);

    return sprite;
  }

  movePlayer(event) {
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
  }

  keyboardListener() {
    document.addEventListener("keydown", (event) => {
      this.movePlayer(event);
      this.checkGoal();
    });
  }

  moveUp() {
    if (this.player.y == 0) {
      return;
    }

    let nextTile = this.map[this.player.y - 1][this.player.x];
    if (nextTile == 1) {
      return;
    }

    this.player.y -= 1;
    this.updateVert();
  }

  moveDown() {
    if (this.player.y == this.map.length - 1) {
      return;
    }

    let nextTile = this.map[this.player.y + 1][this.player.x];
    if (nextTile == 1) {
      return;
    }

    this.player.y += 1;
    this.updateVert();
  }

  moveLeft(sprite) {
    if (this.player.x == 0) {
      return;
    }

    let nextTile = this.map[this.player.y][this.player.x - 1];
    if (nextTile == 1) {
      return;
    }

    this.player.x -= 1;
    this.updateHoriz(sprite);
  }

  moveRight(sprite) {
    if (this.player.x == this.map[this.player.y].length - 1) {
      return;
    }

    let nextTile = this.map[this.player.y][this.player.x + 1];
    if (nextTile == 1) {
      return;
    }

    this.player.x += 1;
    this.updateHoriz(sprite);
  }

  updateVert() {
    this.player.el.style.top = this.player.y * this.tileDim + "px";
  }

  updateHoriz() {
    this.player.el.style.left = this.player.x * this.tileDim + "px";
  }

  checkGoal() {
    let foundCoordinates = this.goals.some(
      (goal) => this.player.y == goal.y && this.player.x == goal.x
    );

    if (foundCoordinates) {
      this.initQuiz();
    } else {
      this.overlay.style.display = "none";
    }
  }
}
