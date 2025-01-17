let userScore = 0;
let compScore = 0;
let roundsPlayed = 0;
const maxWins = 3;

const choices = document.querySelectorAll(".choice");
const message = document.querySelector("#message");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const roundsPara = document.querySelector("#rounds-played");

const drawGame = () => {
  message.innerText = "It was a tie! Play again.";
  message.style.color = "white";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    message.innerText = `You Win! ${userChoice} beats ${compChoice}`;
    message.style.color = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    message.innerText = `You lose! ${compChoice} beats ${userChoice}`;
    message.style.color = "red";
  }
};

const genCompChoice = () => {
  const options = ["Rock", "Paper", "Scissors"];
  const randIx = Math.floor(Math.random() * 3);
  return options[randIx];
};

const playGame = (userChoice) => {
  if (userScore === maxWins || compScore === maxWins) {
    endGame();
    return;
  }

  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "Rock") {
      userWin = compChoice === "Paper" ? false : true;
    } else if (userChoice === "Paper") {
      userWin = compChoice === "Scissors" ? false : true;
    } else {
      userWin = compChoice === "Rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }

  roundsPlayed++;
  roundsPara.innerText = `Rounds Played: ${roundsPlayed}`;

  if (userScore === maxWins || compScore === maxWins) {
    endGame();
  }
};

const endGame = () => {
  if (userScore === maxWins) {
    message.innerText = "Congratulations! You won the game!";
    message.style.color = "green";
  } else if (compScore === maxWins) {
    message.innerText = "Sorry, you lost the game!";
    message.style.color = "red";
  }

  choices.forEach((choice) => {
    choice.disabled = true;
  });
};

const reset = () => {
  userScore = 0;
  compScore = 0;
  roundsPlayed = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  roundsPara.innerText = `Rounds Played: ${roundsPlayed}`;
  message.innerText = "Game Reset. Start playing!";
  message.style.color = "white";

  choices.forEach((choice) => {
    choice.disabled = false;
  });
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
