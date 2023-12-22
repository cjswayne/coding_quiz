const highscoreList = document.querySelector('#highscores-list');
displayHighscore()
function displayHighscore() {
let highscoresList = localStorage.getItem('highscoresList');
console.log(highscoresList);
if (highscoresList) {
let highscores = JSON.parse(highscoresList).map(score => JSON.parse(score));
console.log(highscores);
highscores.sort((a, b) => b.score - a.score);

highscoreList.classList.add('unhide')
highscoreList.classList.remove('hide')

// Clear existing list items
highscoreList.innerHTML = '';

highscores.forEach((score) => {
//   score = JSON.parse(score);
//   console.log(score);
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
const clearHighscoresButton = document.querySelector('#clear-scores');
const goBackButton = document.querySelector("#go-back");

clearHighscoresButton.addEventListener('click', function(){
    clearHighscores();
  });

  goBackButton.addEventListener("click", function () {
    window.location = '/coding_quiz/index.html';
  });

  
function clearHighscores(){
    localStorage.clear()
    
    highscoreList.classList.remove('unhide')
    highscoreList.classList.add('display-none')
    }
    
