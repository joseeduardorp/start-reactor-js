const leds = document.querySelectorAll(".led");
const currentBalls = document.querySelectorAll(".current");
const playerBalls = document.querySelectorAll(".player");
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

let ballIndex = 0;
function verify(e) {
  const index = e.dataset.id;
  playerList.push(index);

  if (playerList[ballIndex] == blinkList[ballIndex]) {
    if (ballIndex + 1 < randomList.length) {
      playerBalls[ballIndex].style.backgroundColor = "lime";

      blinkList.push(randomList[ballIndex + 1]);
      blink(blinkList);
    }
    
    ballIndex++;
    showInfos();
  } else {
    reset();
  }
}

let ledsIndex = 0;
function blink(arr) {
  const blinkOne = (index) => {
    leds[index].style.backgroundColor = "limegreen";

    setTimeout(() => {
      leds[index].style.backgroundColor = "rgb(0, 20, 0)";

      blink(arr);
    }, 500);
  }

  setTimeout(() => {
    if (ledsIndex >= arr.length) {
      ledsIndex = 0;
      return;
    }

    blinkOne(arr[ledsIndex]);
    ledsIndex++;
  }, 500);
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
  ballIndex = 0;

  for (let i = 0; i < currentBalls.length; i++) {
    currentBalls[i].style.backgroundColor = "darkgreen";
  }

  for (let i = 0; i < playerBalls.length; i++) {
    playerBalls[i].style.backgroundColor = "darkgreen";
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
