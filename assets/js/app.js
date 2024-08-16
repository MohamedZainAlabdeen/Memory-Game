// ------ Variables ------ \\
let userAvatar = document.querySelector(".userAvatar"),
  userName = document.querySelector(".userName"),
  wrong = document.querySelector(".wrong"),
  containerGame = document.querySelector(".memory-game-blocks"),
  gameBlocks = document.querySelectorAll(".game-block"),
  orderRange = [...Array(gameBlocks.length).keys()],
  countInterval,
  flippedCount = 0,
  numberOfWrong = 0,
  duration = 1000,
  gameTime = 60;


// ------ Start Game ------ \\
startGame.addEventListener("click", () => {
  overlay.style.display = "none";
  startBox.style.display = "none";
  shuffle();
  flippedAllCard();
  startCountdown();
});

function shuffle() {
  gameBlocks.forEach((block) => {
    const range = orderRange[Math.floor(Math.random() * orderRange.length)];
    block.style.order = range;
  });
}

// ------ flip Card Game ------ \\
gameBlocks.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.add("is-flipped");
    flippedCount++;
    if (flippedCount === 2) {
      const blocks = document.querySelectorAll(".is-flipped");
      stopClicking();
      checkMatchedBlocks(blocks[0], blocks[1]);
      checkWin();
    }
  });
});

// ------ check had Matched Blocks ------ \\
function checkMatchedBlocks(card_1, card_2) {
  if (card_1.dataset.card === card_2.dataset.card) {
    card_1.classList.remove("is-flipped");
    card_2.classList.remove("is-flipped");

    card_1.classList.add("has-match");
    card_2.classList.add("has-match");
  } else {
    setTimeout(() => {
      card_1.classList.remove("is-flipped");
      card_2.classList.remove("is-flipped");
    }, duration);
    numberOfWrong++;
    wrong.innerHTML = numberOfWrong;
  }
  flippedCount = 0;
}

// ------ Stop Clicking on the Blocks ------ \\
function stopClicking() {
  containerGame.classList.add("no-clicking");
  setTimeout(() => containerGame.classList.remove("no-clicking"), duration);
}

// ------ Check Out The Win ------ \\
function checkWin() {
  const MatchedBlocks = document.querySelectorAll(".has-match");
  if (MatchedBlocks.length === 20) {
    document.querySelector(".heading-title").innerHTML = "You Winner";
    endGame();
  }
}

// ------ flipped all Card ------ \\
function flippedAllCard() {
  gameBlocks.forEach((block) => {
    block.classList.add("is-flipped");
    setTimeout(() => block.classList.remove("is-flipped"), 2000);
  });
}

// ------ Countdown ------ \\
function startCountdown() {
  countInterval = setInterval(() => {
    gameTime--;
    if (gameTime < 0) {
      clearInterval(countInterval);
      endGame();
      document.querySelector(".heading-title").innerHTML = "Game Over";
    } else {
      document.querySelector(".game-time span").innerHTML = gameTime;
    }
  }, 1000);
}

// ------ resat Game ------ \\
function resatGame() {
  clearInterval(countInterval);
  for (let i = 0; i < gameBlocks.length; i++) {
    gameBlocks[i].classList.remove("has-match");
    gameBlocks[i].classList.remove("is-flipped");
  }
  gameTime = 60;
  flippedCount = 0;
  document.querySelector(".end-box").style.display = "none";
}

// ------ Play Again ------ \\
const btnPlayAgain = document.getElementById("play-again");
btnPlayAgain.addEventListener("click", () => {
  resatGame();
  flippedAllCard();
  shuffle();
  startCountdown();
  overlay.style.display = "none";
});

// ------ New Game ------ \\
const newGame = document.getElementById("new-game");
newGame.addEventListener("click", () => {
  resatGame();
  startBox.style.display = "block";
  document.querySelector(".end-box").style.display = "none";
});

// ------ End Game ------ \\
function endGame() {
  overlay.style.display = "block";
  document.querySelector(".end-box").style.display = "block";
  document.querySelector(".time-plying span").innerHTML = gameTime === -1 ? "Full Time" : `${60 - gameTime}s`
  document.querySelector(".wrong-tries span").innerHTML = numberOfWrong;
  clearInterval(countInterval);
}
