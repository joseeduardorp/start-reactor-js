const leds = document.querySelectorAll(".led");
const currentPositionBalls = document.querySelectorAll(".current");
const playerPositionBalls = document.querySelectorAll(".player");
const buttons = document.querySelectorAll("button");
const modal = document.querySelector(".modal");

let randomList = [];
let blinkList = [];
let playerList = [];

function randomize() {
  for (let i = 0; i < 5; i++) {
    randomList.push(Math.floor(Math.random() * 9));
  }
}

function win() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = "rgb(0, 200, 200)";
  }

  setTimeout(() => {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.backgroundColor = "rgb(100, 100, 100)";
    }
  }, 500);
}

function lost() {
  for (let i = 0; i < leds.length; i++) {
    leds[i].style.backgroundColor = "rgb(200, 0, 0)";
  }

  setTimeout(() => {
    for (let i = 0; i < leds.length; i++) {
      leds[i].style.backgroundColor = "rgb(0, 0, 25)";
    }
  }, 500);
}

function isFinished() {
  if (playerList.length === randomList.length) {
    win();
    setTimeout(() => {
      reset();
    }, 500);
  }
}

function blockButtons() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

function unblockButtons() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
}

function resetPlayerBallsPosition() {
  setTimeout(() => {
    for (let i = 0; i < playerPositionBalls.length; i++) {
      playerPositionBalls[i].style.backgroundColor = "rgb(40, 40, 40)";
    }
  }, 250);
}

let currentPositionIndex = 0;
function checkMove(index) {
  playerPositionBalls[playerList.length].style.backgroundColor = "green";
  playerList.push(index);
  
  if (playerList[currentPositionIndex] == blinkList[currentPositionIndex]) {
    if (blinkList.length < randomList.length) {
      if (playerList.length === blinkList.length) {
        let nextNumber = currentPositionIndex + 1;

      	blinkList.push(randomList[nextNumber]);
        currentPositionBalls[nextNumber].style.backgroundColor = "green";
        
        resetPlayerBallsPosition();
        blockButtons();
        blink(blinkList);
        
        playerList = [];
        currentPositionIndex = 0;
      } else {
        currentPositionIndex++;
      }
    }
  } else {
    lost();
    reset();
  }
}

function move(e) {
  const index = e.dataset.id;
  
  checkMove(index);
  isFinished();
}

let ledsIndex = 0;
function blink(arr) {
  const blinkOne = (index) => {
    leds[index].style.backgroundColor = "rgb(0, 200, 200)";

    setTimeout(() => {
      leds[index].style.backgroundColor = "rgb(0, 0, 25)";

      blink(arr);
    }, 250);
  }

  setTimeout(() => {
    if (ledsIndex >= arr.length) {
      ledsIndex = 0;
      return unblockButtons();
    }

    blinkOne(arr[ledsIndex]);
    ledsIndex++;
  }, 250);
}

function reset() {
  setTimeout(() => {
    randomList = [];
    blinkList = [];
    playerList = [];
    
    ledsIndex = 0;
    currentPositionIndex = 0;
    
    for (let i = 0; i < currentPositionBalls.length; i++) {
      currentPositionBalls[i].style.backgroundColor = "rgb(40, 40, 40)";
    }
    
    for (let i = 0; i < playerPositionBalls.length; i++) {
      playerPositionBalls[i].style.backgroundColor = "rgb(40, 40, 40)";
    }
    
    blockButtons();
    start();
  }, 1000);
}

function start() {
  randomize();
  blinkList.push(randomList[0]);
  
  setTimeout(() => {
    blink(blinkList);
    currentPositionBalls[0].style.backgroundColor = "green";
  }, 1000);
}

onload = () => {
  blockButtons();

  document.body.addEventListener("keypress", (e) => {
    start();
    if (e.key === "Enter") 
      modal.style.display = "none";
  });
}
