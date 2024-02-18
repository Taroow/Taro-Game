const questions = [
    { question: "À qui donnerais-tu un rein ?", choices: ["Père", "Mère", "Copain", "Frère/Soeur"] },
    { question: "Quel pays rêves-tu de visiter ?", choices: ["France", "Japon", "Australie", "Brésil"] },
    // Ajoutez d'autres questions ici
];

let currentPlayer = 1;
let currentQuestionIndex = 0;
let player1Answers = [];
let player2Answers = [];

function startGame() {
    const playerName = document.getElementById("playerName").value;
    if (playerName !== "") {
        document.getElementById("start-container").style.display = "none";
        document.getElementById("game-container").style.display = "block";
        askQuestion();
    }
}

function askQuestion() {
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options-container");
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.innerText = `Question ${currentQuestionIndex + 1}/15: ${currentQuestion.question}`;
    optionsContainer.innerHTML = "";

    for (let i = 0; i < currentQuestion.choices.length; i++) {
        const optionButton = document.createElement("button");
        optionButton.innerText = currentQuestion.choices[i];
        optionButton.onclick = function() {
            selectAnswer(currentQuestion.choices[i]);
        };
        optionsContainer.appendChild(optionButton);
    }
}

function selectAnswer(answer) {
    if (currentPlayer === 1) {
        player1Answers.push(answer);
    } else {
        player2Answers.push(answer);
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        askQuestion();
    } else {
        displayResults();
    }
}

function displayResults() {
    const statusElement = document.getElementById("status");
    const player1Result = compareAnswers(player1Answers, player2Answers);
    const player2Result = compareAnswers(player2Answers, player1Answers);

    statusElement.innerHTML = `${player1Result}<br>${player2Result}`;
}

function compareAnswers(playerAnswers, opponentAnswers) {
    let result = "Réponses correctes : ";

    for (let i = 0; i < playerAnswers.length; i++) {
        const answerStatus = playerAnswers[i] === opponentAnswers[i] ? "green" : "red";
        result += `<span style="color:${answerStatus};">${playerAnswers[i]}</span> | `;
    }

    return result.slice(0, -2);
}
