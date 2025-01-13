const getComputerChoice = () => {
    const randomNumber = Math.floor(Math.random() * 3);
    switch (randomNumber) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissors';
    }
};

const determineWinner = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
        return 'The game is a tie!';
    }
    if (userChoice === 'rock') {
        if (computerChoice === 'paper') {
            return 'Computer won.';
        } else {
            return 'You won!';
        }
    }

    if (userChoice === 'paper') {
        if (computerChoice === 'scissors') {
            return 'Computer won.';
        } else {
            return 'You won!';
        }
    }

    if (userChoice === 'scissors') {
        if (computerChoice === 'rock') {
            return 'Computer won.';
        } else {
            return 'You won!';
        }
    }
};

const playGame = (choice) => {
    const userChoice = choice;
    const computerChoice = getComputerChoice();
    
    document.getElementById('userChoice').textContent = `You chose: ${userChoice}`;
    document.getElementById('computerChoice').textContent = `Computer chose: ${computerChoice}`;

    const result = determineWinner(userChoice, computerChoice);
    document.getElementById('winner').textContent = result;

    document.querySelectorAll('button').forEach(button => button.classList.add('d-none'));
    document.getElementById('result').classList.remove('d-none');
};

const resetGame = () => {
    document.querySelectorAll('button').forEach(button => button.classList.remove('d-none'));
    document.getElementById('result').classList.add('d-none');
};
