var startButton = document.querySelector("#startButton");
var splashScreen = document.getElementById("splashScreen");
var quizScreen = document.getElementById("quiz");
var timerInterval = document.querySelector("#timer");
var quizQuestions = document.querySelector("#quiz-questions");
var question = document.querySelector("#question");
var highscore = document.querySelector("#highscore");
startButton.addEventListener("click", startQuiz);

//gets buttons from html for quiz answers
var button_1 = document.getElementById("button_1");
var button_2 = document.getElementById("button_2");
var button_3 = document.getElementById("button_3");
var button_4 = document.getElementById("button_4");

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
      "A is assinged t",
      "A and t are equal",
      "A is not equal to t",
      "T is add to a",
    ],
    correctAnswer: "A is not equal to t",
  },
];

loadQuestion(1);

var currentQuestionIndex = 0;

function loadQuestion(index) {
  const currentQuestion = quizData[index];
  question.textContent = currentQuestion.question;

  button_1.textContent = currentQuestion.options[0];
  button_2.textContent = currentQuestion.options[1];
  button_3.textContent = currentQuestion.options[2];
  button_4.textContent = currentQuestion.options[3];

  optionsElement.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const optionButton = document.createElement("button");
    optionButton.textContent = option;
    optionButton.addEventListener("click", () =>
      checkAnswer(option, currentQuestion.correctAnswer)
    );
    optionsElement.appendChild(optionButton);
  });
}
// chooses if the answer is correct or if the answer is wrong and what to do following
function checkAnswer(selectedOption, correctAnswer) {
  if (selectedOption === correctAnswer) {
    win++;
  } else {
    timerInterval(1000);
  }
}

var secondsLeft = 60;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left.";

    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }
  }, 1000);
}

function startQuiz() {
  splashScreen.style.display = "none";
  quizScreen.style.display = "block";
}
