//game variables
let life = 3;
let questionCount = 0;
let score = 0;
let clickCount = 0;

let questionBtn = document.getElementById("question-btn");
let playBtn = document.getElementById("play-btn");

// botón de prueba
questionBtn.addEventListener("click", () => {
  getQuestion();
});

const getQuestion = async () => {
  const result = await axios
    .get("https://opentdb.com/api.php?amount=10&category=31&type=multiple")
    .then((questions) => {
      questionCounter();
      $("#question").html(`<div> ${questions.data.results[0].question} </div>`);
      console.log(questions.data.results[0].question);

      //Boolean answers - Work in progress
      if (questions.data.results[0].type === "boolean") {
        console.log("boolean");
        let wrongAnswer = questions.data.results[0].incorrect_answers[0];
        let rightAnswer = questions.data.results[0].correct_answer;

        $("#question").append(
          `<div id="wrong-btn" class="btn"> ${wrongAnswer} </div>`
        );
        $("#question").append(
          `<div id="right-btn" class="btn"> ${rightAnswer} </div>`
        );

        //interaction
        $("#right-btn").click(function () {
          console.log("this is the right answer:" + rightAnswer);
          $("#solution").text("Correct :)");
          $("#right-btn").addClass("right");
          $("#right-btn").off("click");
          $("#wrong-btn").off("click");
          nextButton();
          scoreCounter();
          clickCounter();
        });

        $("#wrong-btn").click(function () {
          console.log("this is the wrong answer:" + wrongAnswer);
          $("#solution").text("Wrong :c");
          $("#wrong-btn").addClass("wrong");
          $("#right-btn").off("click");
          $("#wrong-btn").off("click");
          nextButton();
          lifeCounter();
          clickCounter();
        });
      }

      //Multiple answers - Work in progress
      if (questions.data.results[0].type === "multiple") {
        let wrongAnswer = questions.data.results[0].incorrect_answers;
        let rightAnswer = questions.data.results[0].correct_answer;
        $("#question").append(
          `<div id="right-btn" class="btn"> ${rightAnswer} </div>
           <div class="btn wrong-btn"> ${wrongAnswer[0]}</div>
           <div class="btn wrong-btn"> ${wrongAnswer[1]}</div>
           <div class="btn wrong-btn"> ${wrongAnswer[2]}</div>`
        );

        document
          .getElementById("right-btn")
          .addEventListener("click", rightButtonClick);

        document.querySelectorAll(".wrong-btn").forEach((button) => {
          button.addEventListener("click", wrongButtonClick);
        });
      }
    })
    .catch((err) => {
      console.log("rejected: ", err);
    });
};

function nextButton() {
  $("#next-btn").fadeIn();
}

function lifeCounter() {
  life--;
  console.log(life);
  $("#life").text("Life: " + life);
  if (life === 0) {
    console.log("game over!");
    $("#game").fadeOut();
    $("#finalScore").text(`Your final score is: ${score}`);

    $("#score").fadeIn();
  }
}

function scoreCounter() {
  score++;
  $("#scoreCount").text(`Score: ${score}`);
}

function questionCounter() {
  questionCount++;
  $("#questionCount").text(`${questionCount}/10`);
}

function clickCounter() {
  clickCount++;
  console.log(clickCount);
  if (clickCount === 10) {
    $("#game").fadeOut();
    $("#finalScore").text(`Your final score is: ${score}`);
    $("#score").fadeIn();
  }
}

function wrongButtonClick(event) {
  $("#solution").text("Wrong :c");
  event.target.classList.add("wrong");
  offButtons();

  nextButton();
  lifeCounter();
  clickCounter();
}

function rightButtonClick() {
  $("#solution").text("Correct :)");
  $("#right-btn").addClass("right");
  offButtons();

  nextButton();
  scoreCounter();
  clickCounter();
}

function reset() {
  life = 3;
  questionCount = 0;
  score = 0;
  clickCount = 0;
  $("#life").text("Life: " + life);
  $("#scoreCount").text(`Score: ${score}`);
  $("#questionCount").text(`${questionCount}/10`);
  $("#next-btn").css("display", "none");
  $("#score").fadeOut();
  $("#landing").fadeIn();
}

function offButtons() {
  console.log(document.getElementById("right-btn"));
  document
    .getElementById("right-btn")
    .removeEventListener("click", rightButtonClick);

  document.querySelectorAll(".wrong-btn").forEach((elem) => {
    elem.removeEventListener("click", wrongButtonClick);
  });
}

$("#play-btn").click(function () {
  $("#landing").fadeOut();
  $("#game").fadeIn();
  getQuestion();
});

$("#next-btn").click(function () {
  getQuestion();
  $("#solution").text("");
  $("#next-btn").fadeOut();
});

// work in progress
function randomAnswersButtonOrder() {}

$("#replay-btn").click(function () {
  reset();
});
