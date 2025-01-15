let userScore  = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const message = document.querySelector("#message");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");


const drawGame = () => {
    message.innerText = "It was a tie! Play again.";
    message.style.color = "white";
}

const showWinnner = (userWin, userChoice, compChoice) => {
    if(userWin) {
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
}

const genCompChoice = () => {
    const options = ["Rock", "Paper", "Scissors"]
    const randIx = Math.floor(Math.random() * 3);
    return options[randIx];
}

const playGame = (userChoice) => {
    const compChoice = genCompChoice();

    if(userChoice === compChoice){
        drawGame();
    } else {
        let userWin = true;
        if(userChoice === "Rock") {
            userWin = compChoice === "Paper" ? false : true;
        } else if(userChoice === "Paper") {
            userWin = compChoice === "Scissors" ? false: true;
        } else {
            userWin = compChoice === "Rock" ? false: true;
        }
        showWinnner(userWin, userChoice, compChoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});