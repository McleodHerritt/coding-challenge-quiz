var startButton = document.querySelector("#startButton");
var splashScreen = document.getElementById("splashScreen");
var quizScreen = document.getElementById("quiz");
var timer = document.querySelector("#timer");
var quizQuestions = document.querySelector("#quizQuestions");
var question = document.querySelector("#question");
var highscore = document.querySelector("#highscore");
var secondsLeft = 60;
var currentQuestionIndex = 0;
var score = 0;
var userFeedback = document.getElementById("userFeedback");

startButton.addEventListener("click", startQuiz);

//gets buttons from html for quiz answers
var button_1 = document.getElementById("button_1");
var button_2 = document.getElementById("button_2");
var button_3 = document.getElementById("button_3");
var button_4 = document.getElementById("button_4");

button_1.addEventListener("click", handleButton);
button_2.addEventListener("click", handleButton);
button_3.addEventListener("click", handleButton);
button_4.addEventListener("click", handleButton);

function handleButton(e) {
  var usersAnswer = e.target.textContent;
  var correctAnswer = quizData[currentQuestionIndex].correctAnswer;
  if (usersAnswer === correctAnswer) {
    score++;
    userFeedback.textContent = "Correct!";
  } else {
    secondsLeft = secondsLeft - 10;
    userFeedback.textContent = "Wrong";
  }

  loadQuestion(++currentQuestionIndex);
}
//created questions, options, and answers for quiz
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
];

function loadQuestion(index) {
  const currentQuestion = quizData[index];
  question.textContent = currentQuestion.question;

  button_1.textContent = currentQuestion.options[0];
  button_2.textContent = currentQuestion.options[1];
  button_3.textContent = currentQuestion.options[2];
  button_4.textContent = currentQuestion.options[3];
}
// chooses if the answer is correct or if the answer is wrong and what to do following
function checkAnswer() {}
function startTimer() {
  // Sets interval in variable
  var timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  secondsLeft--;
  timer.textContent = "Time: " + secondsLeft;
}

function startQuiz() {
  userFeedback.textContent = "";
  splashScreen.style.display = "none";
  quizScreen.style.display = "block";

  startTimer();
  loadQuestion(currentQuestionIndex);
}
