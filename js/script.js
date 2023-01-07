import { startQuiz } from "./quiz.js";
import Maze from "./maze.js";
import { insertData } from "./db.js";

const formContainer = document.querySelector(".form-container");
let form = document.getElementById("onboarding-form");

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
      y: 9,
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

const isVisited = JSON.parse(localStorage.getItem("visited"));
if (!isVisited) {
  formContainer.style.display = "flex";
} else {
  formContainer.style.display = "none";
  new Maze("game-container-1", levels[0], startQuiz);
}
function getData(form) {
  const formData = new FormData(form);
  //validate
  // iterate through entries...
  return Object.fromEntries(formData);
}
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (isVisited) return;

  const data = getData(event.target);
  const result = await insertData({ ...data, date: new Date() });
  if (result?.created) {
    formContainer.style.display = "none";
    new Maze("game-container-1", levels[0], startQuiz);
  }
});
