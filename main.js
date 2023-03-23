const secretBox = document.querySelectorAll(".gameBox");
const failCounter = document.getElementById("try");
const restartBtn = document.getElementById("refresh");
const winnerPoster = document.getElementById("winnerPoster");

let checkerCount,
  interval,
  winChecker,
  failCount,
  arrayForClickedIdx,
  winCounts;

let emojisArray = [
  "😎",
  "😡",
  "😴",
  "🤯",
  "➡️",
  "😅",
  "😡",
  "😴",
  "😏",
  "😅",
  "😎",
  "🤯",
  "😏",
  "➡️",
];

restartBtn.addEventListener("click", initialize);

function randomizeArray(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[randomIndex], array[currentIndex]] = [
      array[currentIndex],
      array[randomIndex],
    ];
  }

  return array;
}

function initialize() {
  checkerCount = 0;
  failCount = 0;
  arrayForClickedIdx = [];
  gaming = true;
  winCounts = 0;
  failCounter.textContent = failCount;

  emojisArray = randomizeArray(emojisArray);
  winnerPoster.classList.add("hidden");

  secretBox.forEach((box, idx) => {
    box.textContent = emojisArray[idx];
    box.classList.add("emmoji");
    box.classList.remove("win");
  });
}

initialize();

// ! game start
secretBox.forEach((box, idx) => {
  box.addEventListener("click", () => startGame(box, idx));
});

function startGame(box, boxIndex) {
  if (checkerCount < 2) {
    box.classList.remove("emmoji");
    arrayForClickedIdx.push(boxIndex);
    checkerCount++;
  }
  if (checkerCount == 2) {
    console.log(checkerCount);
    console.log(arrayForClickedIdx);
    winChecker = checkEquality(arrayForClickedIdx);
    !winChecker && setTimeout(() => closeBoxes(arrayForClickedIdx), 1000);
  }
}

function closeBoxes(array) {
  array[0]?.toString() && secretBox[array[0]].classList.add("emmoji");
  array[1]?.toString() && secretBox[array[1]].classList.add("emmoji");
  arrayForClickedIdx = [];
  checkerCount = 0;
}

function checkEquality(array) {
  let box0 = secretBox[array[0]];
  let box1 = secretBox[array[1]];
  let checkWin = box0.textContent == box1.textContent && array[0] !== array[1];

  if (checkWin) {
    box0.classList.add("win");
    box1.classList.add("win");
    arrayForClickedIdx = [];
    checkerCount = 0;
    winCounts++;
    winCounts == 7 && winnerPoster.classList.remove("hidden");
    return true;
  }

  failCount++;
  failCounter.textContent = failCount;
  return false;
}
