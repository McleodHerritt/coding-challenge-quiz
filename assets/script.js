var startButton = document.querySelector("#startButton");
var splashScreen = document.getElementById("splashScreen");

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  splashScreen.style.display = "none";
}
