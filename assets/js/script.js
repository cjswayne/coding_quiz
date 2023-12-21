/* 
Need to move where incorrect and correct show,
- add in dummy fxns for the storing data stuff
    - Displaying hs
    - clearing hs
    - adding to hs
- add listenrs to go back 
- have timer reset

- polish the file up for readibility
- do normal submission checklist
*/

// function to add listeners to answer buttons
function addAnswerListener(correct) {
  return function (event) {
    correctStyle(correct)
    if (totalTime < timePenalty || questionNum == quizQuestions.length) { // needs to be penalty
      score = totalTime;
      initials();
      endGame();
      totalTime = 0;
    } else {
      // This line will inject the next question
      injectQuestion(quizQuestions[questionNum], event);
    }
  };
}

// function to display incorrect or correct message
function correctStyle(correct){
    if(questionCard.classList.contains('hide')){
      text.classList.remove('unhide');
      text.classList.add('hide');
        text.style.display = "none";
    } else if(questionCard.classList.contains('unhide')){
      text.textContent = "";
      text.classList.remove('hide');
      text.classList.add('unhide');
      text.style.display = "block";
        questionNum++;
        if(!correct){correct=false;}
        if(correct){
            text.textContent = "Correct!";
            text.classList.add('correct');
        } else {
            text.textContent = "Incorrect!";
            text.classList.add('incorrect');
            subtractTime();
        }
        setTimeout(function(){
          text.classList.remove('unhide');
          text.classList.add('hide');

        }, 1000);
    }
}



// function to inject question
function injectQuestion(question, event) {
  console.log(event);
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
    if (correctAnswer === answer) {
      answerButton.style.backgroundColor = "green";
    } else {
      answerButton.style.backgroundColor = "blue";
    }

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
  totalTime;
}

// function to reset the questions
function resetQuestions() {
  firstQuestion = 0;
  injectQuestion(quizQuestions[0]);
}

//function to start timer
function startTimer(timer) {
  timer = setInterval(function () {
    if (totalTime <= 0) {
      clearInterval(timer);
      timer;
      if (questionCard.classList.contains('unhide')){
        score = 0;
        initials();

        endGame();  
      }

    console.log(totalTime);
    } else if (questionNum != quizQuestions.length && questionCard.classList.contains('unhide')) {
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
  scoreText.textContent = score;
  timerDisplay.textContent = 0;
  hideOtherCards(initialsCard);
}

// Function to reset game
function restartQuiz() {
  questionNum = 0;
  totalTime = startingTime;
  timerDisplay.textContent = totalTime +1;

  startTimer(timer);
  hideOtherCards(questionCard);

}

// function to hide all other cards except whichever one is being passed inside
function hideOtherCards(displayCard){
  let elements = document.querySelectorAll('.quiz-section');
  elements.forEach(item => {
    if (displayCard === item){
      displayCard.classList.remove('hide');
      displayCard.classList.add('unhide');
    } else {
      item.classList.remove('unhide')
      item.classList.add('hide')
    }
  });
}
// function to log the highscore
function logHighscore() {
    const userInitials = document.querySelector("#initials").value;
    // highscores.push({ score: score, initials: userInitials});
    console.log(userInitials);
    console.log(score);
    // console.log(highscores);
}

// function to display Highscore
function displayHighscore(scoreText) {
    nameText = document.querySelector("#initials").value;

    if(scoreText != 0){
    const highscoreList = document.querySelector('#highscores-list');
    const li = document.createElement('li');
    const nameSpan = document.createElement('span');
    nameSpan.classList.add('nameText', 'highscoreText');
    nameSpan.textContent = nameText;
    li.appendChild(nameSpan);

    const scoreSpan = document.createElement('span');
    scoreSpan.classList.add('scoreText', 'highscoreText');
    scoreSpan.textContent = scoreText;
    li.appendChild(scoreSpan);

   highscoreList.appendChild(li);}
}
// function to clear highscores
function clearHighscores(){

}

let questionNum = 0;
const text = document.querySelector(".answer-text");
let score;

// Timer Variables 
let startingTime = 120;
let timePenalty = 10;
let timer;
let timerToggle = true;
const timerDisplay = document.getElementById("time");

// HTML Section Elements
const initialsCard = document.querySelector("#initials-container");
const highscoreCard = document.querySelector("#highscores-container");
const questionCard = document.querySelector("#quiz-question-container");
const quizRulesCard = document.querySelector(".quiz-rules");

// Buttons
const startButton = document.getElementById("start-quiz");
const submitButton = document.getElementById("submit-button");
const goBackButton = document.querySelector("#go-back");
const highScoreButton = document.querySelector('#high-scores');
const clearHighscoresButton = document.querySelector('#clear-scores');

hideOtherCards(quizRulesCard);
injectQuestion(quizQuestions[questionNum]);

highScoreButton.addEventListener("click", function(){
  hideOtherCards(highscoreCard);
});
goBackButton.addEventListener("click", function () {
  hideOtherCards(quizRulesCard);
});
submitButton.addEventListener("click", function () {
  logHighscore();
  displayHighscore(totalTime);
  hideOtherCards(highscoreCard);
});
clearHighscoresButton.addEventListener('click', function(){
  clearHighscores();
});
startButton.addEventListener("click", function () {
  score = 0;
  restartQuiz();
});

/* 

have timer toggle so initials doesnt show when time is at 0 and u r not answering questions 

display quiz section
we will have object with quiz questions and answers
if correct answer add to variable of score with fxn
we will pass object content into quiz section

*/
