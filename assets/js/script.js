let questionNum = 0;
let score;

// Timer Variables
let startingTime = 119;
let timePenalty = 10;
let timer;
const timerDisplay = document.querySelector("#time");

// HTML Section Elements
const initialsCard = document.querySelector("#initials-container");
const highscoreCard = document.querySelector("#highscores-container");
const questionCard = document.querySelector("#quiz-question-container");
const quizRulesCard = document.querySelector(".quiz-rules");
const text = document.querySelector(".answer-text");

// Buttons
const startButton = document.querySelector("#start-quiz");
const submitButton = document.querySelector("#submit-button");
const highScoreButton = document.querySelector("#high-scores");

// function to add listeners to answer buttons
function addAnswerListener(correct) {
  return function (event) {
    correctStyle(correct);
    if (totalTime < timePenalty || questionNum == quizQuestions.length) {
      initials();
      endGame();
      totalTime = 0;
    } else {
      // This line will inject the next question
      injectQuestion(quizQuestions[questionNum]);
    }
  };
}

// function to display incorrect or correct message
function correctStyle(correct) {
  if (questionCard.classList.contains("hide")) {
    text.classList.remove("unhide");
    text.classList.add("hide");
  } else if (questionCard.classList.contains("unhide")) {
    text.textContent = "";
    text.classList.remove("hide");
    text.classList.add("unhide");
    questionNum++;
    correct = !!correct;
    if (correct) {
      text.textContent = "Correct!";
      text.classList.add("correct");
    } else {
      text.textContent = "Incorrect!";
      text.classList.add("incorrect");
      subtractTime();
    }
    setTimeout(function () {
      text.classList.remove("unhide");
      text.classList.add("hide");
    }, 1000);
  }
}

// function to inject question
function injectQuestion(question) {
  let questionText = document.querySelector("#question");
  let answers = question.answers;
  let answerButtons = document.querySelectorAll(".answer");
  let correctAnswer = question.answer;
  questionText.textContent = question.question;

  answerButtons.forEach((button) => {
    let clone = button.cloneNode(true);
    button.parentNode.replaceChild(clone, button);
  });

  answers.forEach(function (answer, index) {
    let answerTextId = `question${index + 1}`;
    let answerButtonId = `button-question${index + 1}`;
    let answerText = document.getElementById(answerTextId);
    let answerButton = document.getElementById(answerButtonId);

    answerText.textContent = answer;

    answerButton.addEventListener(
      "click",
      addAnswerListener(correctAnswer === answer)
    );
  });
}

// function to end game
function endGame() {
  correctStyle();
  timerDisplay.textContent = 0;
}

// function to reset the questions
function resetQuestions() {
  injectQuestion(quizQuestions[0]);
}

//function to start timer
function startTimer(timer) {
  timer = setInterval(function () {
    if (totalTime <= 0) {
      clearInterval(timer);
      if (questionCard.classList.contains("unhide")) {
        score = 0;
        initials();

        endGame();
      }

      console.log(totalTime);
    } else if (
      questionNum != quizQuestions.length &&
      questionCard.classList.contains("unhide")
    ) {
      timerDisplay.textContent = totalTime;
      totalTime -= 1;
    }
  }, 1000);
}

//function to subtract time
function subtractTime() {
  totalTime -= timePenalty;
}

//function to enter initials
function initials() {
  const scoreText = document.getElementById("score");
  scoreText.textContent = score < 0 ? 0 : score;
  timerDisplay.textContent = 0;
  hideOtherCards(initialsCard);
}

// Function to reset game
function restartQuiz() {
  questionNum = 0;
  totalTime = startingTime;
  timerDisplay.textContent = totalTime + 1;

  startTimer(timer);
  hideOtherCards(questionCard);
}

// function to hide all other cards except whichever one is being passed inside
function hideOtherCards(displayCard) {
  let elements = document.querySelectorAll(".quiz-section");
  elements.forEach((item) => {
    if (displayCard === item) {
      displayCard.classList.remove("hide");
      displayCard.classList.add("unhide");
    } else {
      item.classList.remove("unhide");
      item.classList.add("hide");
    }
  });
}
// function to log the highscore
function logHighscore() {
  const userInitials = document.querySelector("#initials").value;
  console.log(userInitials);
  let highscoresList = localStorage.getItem("highscoresList");
  let highscores = JSON.parse(highscoresList) || [];

  let newScore = JSON.stringify({
    initials: userInitials,
    score: score < 0 ? 0 : score,
  });
  console.log(newScore);

  highscores.push(newScore);
  localStorage.setItem("highscoresList", JSON.stringify(highscores));
}

hideOtherCards(quizRulesCard);
injectQuestion(quizQuestions[questionNum]);

highScoreButton.addEventListener("click", function () {
  window.location = "/coding_quiz/highscores.html";
});

submitButton.addEventListener("click", function () {
  logHighscore();
  window.location = "/coding_quiz/highscores.html";
  displayHighscore(totalTime);
});
startButton.addEventListener("click", function () {
  score = 0;
  restartQuiz();
});
