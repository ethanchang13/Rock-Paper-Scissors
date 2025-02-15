// Start game when button is clicked
document.getElementById("start-game").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();

  if (username) {
    document.querySelector(".score-title").innerText = username.toUpperCase();
    document.getElementById("username-section").style.display = "none";
    document.getElementById("game-section").style.display = "block";
    document.getElementById("game-title").style.display = "none";
  } else {
    alert("Please enter your name to start the game!");
  }
});

// Initialize game variables
let userScore = 0;
let compScore = 0;
let roundsPlayed = 0;
const maxWins = 3;

const choices = document.querySelectorAll(".choice");
const message = document.querySelector("#message");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const roundsPara = document.querySelector("#rounds-played");

// Handle a tie
const drawGame = () => {
  message.innerText = "It was a tie! Play again.";
  message.style.color = "white";
};

// Determine and display the round winner
const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
  } else {
    compScore++;
    compScorePara.innerText = compScore;
  }

  if (userScore === maxWins || compScore === maxWins) {
    endGame();
  } else {
    message.innerText = userWin
      ? `You Win! ${userChoice} beats ${compChoice}`
      : `You lose! ${compChoice} beats ${userChoice}`;
    message.style.color = userWin ? "green" : "red";
  }
};

// Generate a random computer choice
const genCompChoice = () => {
  const options = ["Rock", "Paper", "Scissors"];
  return options[Math.floor(Math.random() * 3)];
};

// Play a round
const playGame = (userChoice) => {
  if (userScore >= maxWins || compScore >= maxWins) return;

  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "Rock") {
      userWin = compChoice !== "Paper";
    } else if (userChoice === "Paper") {
      userWin = compChoice !== "Scissors";
    } else {
      userWin = compChoice !== "Rock";
    }
    showWinner(userWin, userChoice, compChoice);
  }

  roundsPlayed++;
  roundsPara.innerText = `Rounds Played: ${roundsPlayed}`;
};

// End the game when max wins are reached
const endGame = () => {
  if (userScore === maxWins) {
    message.innerText = "Congratulations! You won the game!";
    message.style.color = "green";
    triggerConfetti();
  } else {
    message.innerText = "Sorry, you lost the game!";
    message.style.color = "red";
  }

  choices.forEach((choice) => {
    choice.disabled = true;
  });
};

// Reset game state
const reset = () => {
  userScore = 0;
  compScore = 0;
  roundsPlayed = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  roundsPara.innerText = `Rounds Played: ${roundsPlayed}`;
  message.innerText = "";
  message.style.color = "";

  choices.forEach((choice) => {
    choice.disabled = false;
  });
};

// Add event listeners to choices
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (userScore < maxWins && compScore < maxWins) {
      playGame(choice.getAttribute("id"));
    }
  });
});

// Trigger confetti animation on win
const triggerConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 },
  });
};
