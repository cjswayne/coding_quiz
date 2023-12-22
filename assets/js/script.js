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
const highscoreList = document.querySelector('#highscores-list');

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
      console.log('sudn');
      item.classList.remove('unhide')
      item.classList.add('hide')
    }
  });
}
// function to log the highscore
function logHighscore() {
  const userInitials = document.querySelector("#initials").value;
  console.log(userInitials);
  // highscoresList
let highscoresList = localStorage.getItem('highscoresList');
let highscores =  JSON.parse(highscoresList) || [];

let newScore = JSON.stringify({"initials":userInitials, "score":score});
console.log(newScore);

highscores.push(newScore);
localStorage.setItem('highscoresList', JSON.stringify(highscores));


}

// function to display Highscore
function displayHighscore() {
  let highscoresList = localStorage.getItem('highscoresList');

  if (highscoresList) {
    let highscores = JSON.parse(highscoresList);
    console.log(highscores);

    highscoreList.classList.add('unhide')
highscoreList.classList.remove('hide')

    // Clear existing list items
    highscoreList.innerHTML = '';

    highscores.forEach((score) => {
      score = JSON.parse(score);
      console.log(score);
      const li = document.createElement('li');
      const nameSpan = document.createElement('span');
      nameSpan.classList.add('nameText', 'highscoreText');
      nameSpan.textContent = score.initials;
      li.appendChild(nameSpan);

      const scoreSpan = document.createElement('span');
      scoreSpan.classList.add('scoreText', 'highscoreText');
      scoreSpan.textContent = score.score;
      li.appendChild(scoreSpan);

      highscoreList.appendChild(li);
    });
  }
}

// function to clear highscores
let questionNum = 0;
const text = document.querySelector(".answer-text");
let score;

// Timer Variables 
let startingTime = 12;
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
const highScoreButton = document.querySelector('#high-scores');


hideOtherCards(quizRulesCard);
injectQuestion(quizQuestions[questionNum]);

highScoreButton.addEventListener("click", function(){
  window.location = '../../highscores.html'
  // hideOtherCards(highscoreCard);
});

submitButton.addEventListener("click", function () {
  logHighscore();
  // hideOtherCards(highscoreCard);
  window.location = '../../highscores.html'
  displayHighscore(totalTime);

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
