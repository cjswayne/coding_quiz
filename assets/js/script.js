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




// Function to inject question text
let questionNum = 0;


function addAnswerListener(correct) {
    let text = document.getElementById('high-scores');
    return function(event) {
        if(correct) {
            questionNum++;
            text.innerText = "Correct!";
            text.style.color = "green";
        } else {
            questionNum++;
            text.innerText = "Incorrect!";
            text.style.color = "red";
            subtractTime();
        }
        console.log(questionNum);
        console.log(quizQuestions.length)
    
        if(questionNum == quizQuestions.length){
            initials();
    
        } else {
        // This line will inject the next question
        injectQuestion(quizQuestions[questionNum], quizQuestions[questionNum].answers);
        }
    };
}


function injectQuestion(question, questionAnswers){


    let correctAnswerButton = "";
    let questionText = document.querySelector("#question");
    let answers = questionAnswers;
    let answerButtons = document.querySelectorAll(".answer");
    let correctAnswer = question.answer;
    questionText.innerText = question.question;

    answerButtons.forEach(button => {
        let clone = button.cloneNode(true);
        button.parentNode.replaceChild(clone, button);
    });

    answers.forEach(function(answer, index){
        let answerTextId = `question${index+1}`;
        let answerButtonId = `button-question${index+1}`;
        let answerText = document.getElementById(answerTextId);
        let answerButton = document.getElementById(answerButtonId);

        answerText.innerText = answer;
        answerButton.addEventListener('click', addAnswerListener(correctAnswer === answer));
    });

}



//function to start timer
function startTimer(){
    let timer = setInterval(function(){
        totalTime -= 1;
        timerDisplay.innerText = totalTime;

        if (totalTime <= 0){
            clearInterval(timer);
            console.log('done');
        }
    }, 1000);
}
//function to subtract time
function subtractTime(){
    totalTime -= timePenalty;
    console.log('time deducted')
}

//function to enter initials
function initials(){
    let score = totalTime;
    const initialsContainer = document.getElementById('initials-container');
    const questionContainer = document.getElementById('quiz-question-container');

    totalTime = 1;
    timerDisplay.innerText = totalTime;
    questionContainer.style.display = "none";
    initialsContainer.style.display = "block";

    const scoreText = document.getElementById("score");
    console.log(scoreText);

    scoreText.innerText = score;


}
let quizQuestions = [
    {
        question: "Which HTML5 element is used for defining a footer for a document or section?",
        answer: "<footer>",
        answers: [
            "<footer>",
            "<bottom>",
            "<div>",
            "<section>"
        ]
    },

    {
        question: "What is the purpose of the 'async' attribute in a <script> tag?",
        answer: "It loads the script asynchronously with the rest of the page",
        answers: [
            "It defers script execution until page load",
            "It pauses script execution",
            "It loads the script synchronously",
            "It loads the script asynchronously with the rest of the page"
        ]
    },
    // {
    //     question: "In Node.js, which module is used to handle HTTP requests and responses?",
    //     answer: "http",
    //     answers: [
    //         "request",
    //         "http",
    //         "net",
    //         "socket"
    //     ]
    // },
    // {
    //     question: "What does the 304 status code in HTTP signify?",
    //     answer: "Not Modified",
    //     answers: [
    //         "Bad Request",
    //         "Not Modified",
    //         "Forbidden",
    //         "Not Found"
    //     ]
    // },
    // {
    //     question: "In React, what is the method to change a component's state?",
    //     answer: "setState()",
    //     answers: [
    //         "changeState()",
    //         "modifyState()",
    //         "updateState()",
    //         "setState()"
    //     ]
    // },
    // {
    //     question: "What does SQL stand for?",
    //     answer: "Structured Query Language",
    //     answers: [
    //         "Simple Query Language",
    //         "Structured Query Language",
    //         "Standard Query Language",
    //         "Secure Query Language"
    //     ]
    // },
    // {
    //     question: "In MongoDB, what is a 'Document' equivalent to in SQL?",
    //     answer: "A row in a table",
    //     answers: [
    //         "A table",
    //         "A database",
    //         "A row in a table",
    //         "A column in a table"
    //     ]
    // },
    // {
    //     question: "Which CSS layout model introduces a two-dimensional grid system to the web?",
    //     answer: "CSS Grid Layout",
    //     answers: [
    //         "Flexbox",
    //         "CSS Grid Layout",
    //         "Box Model",
    //         "Positioning"
    //     ]
    // },
    // {
    //     question: "What is the purpose of Docker in development?",
    //     answer: "Creating, deploying, and running applications in isolated environments (containers)",
    //     answers: [
    //         "Version control",
    //         "Text editing",
    //         "Creating, deploying, and running applications in isolated environments (containers)",
    //         "Browser testing"
    //     ]
    // },
    // {
    //     question: "What does REST stand for in the context of API design?",
    //     answer: "Representational State Transfer",
    //     answers: [
    //         "Real-time Simple Transfer",
    //         "Representational State Transfer",
    //         "Reliable Session Transfer",
    //         "Remote Server Transfer"
    //     ]
    // },
    // {
    //     question: "In Angular, what is a Directive?",
    //     answer: "A class with a @Directive decorator that extends HTML behavior",
    //     answers: [
    //         "A method to route paths",
    //         "A server-side script",
    //         "A CSS preprocessor",
    //         "A class with a @Directive decorator that extends HTML behavior"
    //     ]
    // },
    // {
    //     question: "What is the main purpose of a JWT (JSON Web Token)?",
    //     answer: "To securely transmit information between parties as a JSON object",
    //     answers: [
    //         "To encrypt passwords",
    //         "To manage user sessions",
    //         "To securely transmit information between parties as a JSON object",
    //         "To store data in local storage"
    //     ]
    // },
    // {
    //     question: "In Redux, what is an 'Action'?",
    //     answer: "An object that describes what happened",
    //     answers: [
    //         "A function that returns the new state",
    //         "A method to dispatch state changes",
    //         "An object that describes what happened",
    //         "A component that handles state"
    //     ]
    // },
    // {
    //     question: "What is the main use of TypeScript in web development?",
    //     answer: "To provide static typing for JavaScript",
    //     answers: [
    //         "To compile code to machine language",
    //         "To provide static typing for JavaScript",
    //         "To manage server-side scripting",
    //         "To enhance CSS styling"
    //     ]
    // },
    // {
    //     question: "In Git, what is the command to create a new branch?",
    //     answer: "git branch [branch-name]",
    //     answers: [
    //         "git make branch [branch-name]",
    //         "git new branch [branch-name]",
    //         "git branch [branch-name]",
    //         "git create [branch-name]"
    //     ]
    // },
    // {
    //     question: "What does 'CI/CD' stand for in DevOps?",
    //     answer: "Continuous Integration/Continuous Delivery",
    //     answers: [
    //         "Continuous Integration/Continuous Deployment",
    //         "Continuous Implementation/Continuous Development",
    //         "Continuous Integration/Continuous Delivery",
    //         "Constant Integration/Constant Deployment"
    //     ]
    // },
    // {
    //     question: "In web development, what does 'SEO' stand for?",
    //     answer: "Search Engine Optimization",
    //     answers: [
    //         "Search Engine Optimization",
    //         "Server Endpoint Output",
    //         "Simple Element Object",
    //         "Secure Encryption Operation"
    //     ]
    // },
    // {
    //     question: "What is a 'Promise' in JavaScript?",
    //     answer: "An object representing the eventual completion or failure of an asynchronous operation",
    //     answers: [
    //         "A data type similar to an array",
    //         "A function that executes conditionally",
    //         "A loop that runs until a condition is met",
    //         "An object representing the eventual completion or failure of an asynchronous operation"
    //     ]
    // },
    // {
    //     question: "In web security, what is 'XSS'?",
    //     answer: "Cross-Site Scripting",
    //     answers: [
    //         "Cross-Server Security",
    //         "Cross-Site Scripting",
    //         "Extended Style Sheets",
    //         "Exclusive Server Setup"
    //     ]
    // }
    
]


let totalTime = 120;
let timePenalty = 10;
let timerDisplay = document.getElementById('time');

document.addEventListener('DOMContentLoaded', function() {


    const initialsContainer = document.getElementById('initials-container');
    const highscoreContainer = document.getElementById('highscores-container');
    console.log(highscoreContainer);

const startButton = document.getElementById('start-quiz');
console.log(questionNum);
const submitButton = document.getElementById('submit-button');



submitButton.addEventListener("click", function(){
    initialsContainer.style.display = "none";
    highscoreContainer.style.display = "block";
})

let firstQuestion = quizQuestions[questionNum];
startButton.addEventListener('click', function(){
    const quizRules = document.querySelector('.quiz-rules');
    const questionContainer = document.getElementById('quiz-question-container');
    quizRules.style.display = 'none'; 
    questionContainer.style.display = "block";
    startTimer();
});

// for (let questionNum = 0; questionNum < 2; ){
    console.log(quizQuestions[questionNum].answers);
    injectQuestion(firstQuestion, quizQuestions[questionNum].answers);
   
// }


});

/* 

display quiz section
we will have object with quiz questions and answers
if correct answer add to variable of score with fxn
we will pass object content into quiz section

*/