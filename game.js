const leds = document.querySelectorAll(".led");
const currentPositionBalls = document.querySelectorAll(".current");
const playerPositionBalls = document.querySelectorAll(".player");
const buttons = document.querySelectorAll("button");

const randomListElement = document.getElementById("randomList");
const blinkListElement = document.getElementById("blinkList");
const playerListElement = document.getElementById("playerList");

let randomList = [];
let blinkList = [];
let playerList = [];

function randomize() {
  for (let i = 0; i < 5; i++) {
    randomList.push(Math.floor(Math.random() * 9));
  }
}

let currentPositionIndex = 0;
function checkMove() {
  if (playerList[currentPositionIndex] == blinkList[currentPositionIndex]) {
    if (blinkList.length < randomList.length) {
      if (playerList.length === blinkList.length) {
        blinkList.push(randomList[currentPositionIndex + 1]);
        blink(blinkList);
        
        playerList = [];
        currentPositionIndex = 0;
      } else {
        currentPositionIndex++;
      }
    }

    showInfos();
  } else {
    reset();
  }
}

function move(e) {
  const index = e.dataset.id;
  playerList.push(index);

  checkMove();
}

let ledsIndex = 0;
function blink(arr) {
  const blinkOne = (index) => {
    leds[index].style.backgroundColor = "limegreen";

    setTimeout(() => {
      leds[index].style.backgroundColor = "rgb(0, 20, 0)";

      blink(arr);
    }, 250);
  }

  setTimeout(() => {
    if (ledsIndex >= arr.length) {
      ledsIndex = 0;
      return;
    }

    blinkOne(arr[ledsIndex]);
    ledsIndex++;
  }, 250);
}

function showInfos() {
  randomListElement.innerText = "Random List: " + randomList;
  blinkListElement.innerText = "Blink List: " + blinkList;
  playerListElement.innerText = "Player List: " + playerList;
}

function reset() {
  randomList = [];
  blinkList = [];
  playerList = [];

  ledsIndex = 0;
  currentPositionIndex = 0;

  for (let i = 0; i < currentPositionBalls.length; i++) {
    currentPositionBalls[i].style.backgroundColor = "darkgreen";
  }

  for (let i = 0; i < playerPositionBalls.length; i++) {
    playerPositionBalls[i].style.backgroundColor = "darkgreen";
  }

  showInfos();
  start();
}

function start() {
  randomize();
  blinkList.push(randomList[0]);

  showInfos();

  setTimeout(() => {
    blink(blinkList);
  }, 1000);
}

onload = () => {
  start();
}
