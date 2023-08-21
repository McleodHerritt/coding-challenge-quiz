// DOM elements for various sections and controls in the quiz
var startButton = document.querySelector("#startButton");
var splashScreen = document.getElementById("splashScreen");
var quizScreen = document.getElementById("quiz");
var timer = document.querySelector("#timer");
var quizQuestions = document.querySelector("#quizQuestions");
var question = document.getElementById("question");
var highscore = document.querySelector("#highscore");

// Quiz timer configuration
var allowedTime = 90;
var secondsLeft = allowedTime;

// Index to keep track of the current question
var currentQuestionIndex = 0;

// Variable to store user's score
var score = 0;

// Feedback for the user's answer
var userFeedback = document.getElementById("userFeedback");

// Interval for the quiz timer
var timerInterval = null;

// DOM elements for answer buttons
var button_1 = document.getElementById("button_1");
var button_2 = document.getElementById("button_2");
var button_3 = document.getElementById("button_3");
var button_4 = document.getElementById("button_4");

// Event listeners for starting the quiz and handling answer button clicks
startButton.addEventListener("click", startQuiz);
button_1.addEventListener("click", handleButton);
button_2.addEventListener("click", handleButton);
button_3.addEventListener("click", handleButton);
button_4.addEventListener("click", handleButton);

// Event listeners for handling high scores and related actions
$(document).ready(function () {
  $("#enterHighScore").submit(handleSubmittingHighScore);
  $("#highscore").click(showHighScore);
  $("#clearHighscoreButton").click(clearHighScores);
  $("#goBackButton").click(showSplashScreen);
});

// Function to show the initial splash screen
function showSplashScreen() {
  secondsLeft = allowedTime;
  timer.textContent = "Time: " + secondsLeft;
  $("header").show();
  $("#splashScreen").show();
  $("#quiz").hide();
  $("#submitHighScoreScreen").hide();
  $("#highScoreScreen").hide();
}

// Function to clear stored high scores
function clearHighScores() {
  localStorage.clear();
  showHighScore();
}

// Function to display the high score screen
function showHighScore() {
  $("header").hide();
  $("#splashScreen").hide();
  $("#quiz").hide();
  $("#submitHighScoreScreen").hide();
  $("#highScoreScreen").show();
  displayHighScores();
}

// Function to fetch and display stored high scores
function displayHighScores() {
  var highScoreContainer = document.getElementById("highScoreContainer");
  highScoreContainer.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("highScores")) || [];
  if (highscores == 0) {
    $("#highScoreContainer").text("No High Scores Yet!");
  }
  highscores.forEach((entry) => {
    var scoreElement = document.createElement("div");
    scoreElement.classList.add("highScoreEntry");
    scoreElement.textContent = "" + entry.initials + ": " + entry.score;
    highScoreContainer.appendChild(scoreElement);
  });
}

// Function to handle user submission of high scores
function handleSubmittingHighScore(e) {
  e.preventDefault();
  var highscores = JSON.parse(localStorage.getItem("highScores")) || [];
  var initials = $("#initials").val();
  console.log("initials: " + initials);
  var newScore = { initials: initials, score: score };
  highscores.push(newScore);
  highscores.sort((a, b) => b.score - a.score);
  highscores = highscores.slice(0, 10);
  localStorage.setItem("highScores", JSON.stringify(highscores));

  showHighScore();
}

// Function to handle user's answer to a question
function handleButton(e) {
  if (currentQuestionIndex > quizData.length - 1) {
    gameOver();
    return;
  }
  var usersAnswer = e.target.textContent;
  var correctAnswer = quizData[currentQuestionIndex].correctAnswer;
  if (usersAnswer === correctAnswer) {
    score++;
    userFeedback.textContent = "Correct!";
  } else {
    secondsLeft = secondsLeft - 10;
    userFeedback.textContent = "Wrong";
  }
  $("#userFeedback").show();
  $("#userFeedback").fadeOut(3000);
  loadQuestion(++currentQuestionIndex);
}

// Array containing questions, options, and answers for the quiz
var quizData = [
  {
    question: "A short sections of code written to complete a task.",
    options: ["buffer", "array", "function", "loop"],
    correctAnswer: "function",
  },

  {
    question: "What does this equation mean ? a != t .",
    options: [
      "a is assinged to t",
      "a and t are equal",
      "t is added to a",
      "a is not equal to t",
    ],
    correctAnswer: "a is not equal to t",
  },
  {
    question:
      "Which HTML element is used to specify a footer for a document or section?",
    options: ["<section>", "<bottom>", "<footer>", "<div>"],
    correctAnswer: "<footer>",
  },

  {
    question:
      "In CSS, which property is used to set the background color of an element?",
    options: ["color", "background-color", "bgcolor", "bgColor"],
    correctAnswer: "background-color",
  },

  {
    question:
      "Which JavaScript method is used to get the value of a form element?",
    options: [
      "getElementValue()",
      "getValue()",
      "getElementById().value",
      "form.value",
    ],
    correctAnswer: "getElementById().value",
  },

  {
    question: "Which of the following is not a valid JavaScript variable name?",
    options: ["_firstVar", "2ndVar", "firstVar", "first_Var"],
    correctAnswer: "2ndVar",
  },

  {
    question: "Which CSS property controls the space between lines of text?",
    options: ["spacing", "line-height", "line-spacing", "text-line"],
    correctAnswer: "line-height",
  },

  {
    question:
      "Which HTML attribute is used to specify the alternative text for an image, in case it cannot be displayed?",
    options: ["src", "alt", "description", "caption"],
    correctAnswer: "alt",
  },

  {
    question:
      "In JavaScript, how would you write a conditional statement that checks if 'i' is NOT equal to 5?",
    options: ["if (i !== 5)", "if i != 5", "if i <> 5", "if (i != 5)"],
    correctAnswer: "if (i !== 5)",
  },

  {
    question: "Which CSS property sets the size of the font?",
    options: ["text-size", "font-size", "font-style", "text-style"],
    correctAnswer: "font-size",
  },
];

// Function to display a question and its options
function loadQuestion(index) {
  if (index > quizData.length - 1) {
    gameOver();
    return;
  }
  const currentQuestion = quizData[index];
  question.textContent = currentQuestion.question;

  button_1.textContent = currentQuestion.options[0];
  button_2.textContent = currentQuestion.options[1];
  button_3.textContent = currentQuestion.options[2];
  button_4.textContent = currentQuestion.options[3];
}

// Function to start the quiz timer
function startTimer() {
  // Sets interval in variable
  timerInterval = setInterval(updateTimer, 1000);
}

// Function to update the timer on screen
function updateTimer() {
  if (secondsLeft <= 0) {
    gameOver();
  } else {
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft;
  }
}

// Function to start the quiz
function startQuiz() {
  userFeedback.textContent = "";
  splashScreen.style.display = "none";
  quizScreen.style.display = "block";

  startTimer();
  loadQuestion(currentQuestionIndex);
}

// Function to end the quiz
function gameOver() {
  clearInterval(timerInterval);
  quizScreen.style.display = "none";
  $("#submitHighScoreScreen").show();
  $("#finalScore").text("Your final score is " + score);
  $("#highScoreScreen").hide();
}
