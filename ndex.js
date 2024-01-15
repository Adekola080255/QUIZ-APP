const ContainerOne = document.querySelector("#container-1"),
  ContainerTwo = document.querySelector("#container-2"),
  ContainerThree = document.querySelector("#container-3"),
  QuestionNumber = document.querySelector("#ques-no"),
  QuestionType = document.querySelector("#ques-type"),
  TotalTime = document.querySelector("#time"),
  StartBtn = document.querySelector("#submiting"),
  CheckBtn = document.querySelector("#check"),
  NextBtn = document.querySelector("#next"),
  questionDiv = document.querySelector(".question-holder"),
  CountUp = document.querySelector(".count-down"),
  QuesNo = document.querySelector(".question-number"),
  Options = document.querySelector(".options"),
  TimeUsed = document.querySelector(".time-used"),
  YourScore = document.querySelector(".your-score"),
  TotalScore = document.querySelector(".total-score"),
  PlayAgain = document.querySelector("#play-again"),
  EndGame = document.querySelector(".end-game");

const num = QuestionNumber.value;
const type = QuestionType.value;

const startMin = 0;
let timer = startMin * 60,
  currentQuestion,
  score;

function updateCounting() {
  let minute = Math.floor(timer / 60);
  let seconds = Number(timer % 60);

  minute = minute < 10 ? "0" + minute : minute;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  CountUp.innerHTML = `${minute}:${seconds}`;
  TimeUsed.innerHTML = `${minute}:${seconds}`;
  timer++;
}

StartBtn.addEventListener("click", StartGame);

function StartGame(e) {
  e.preventDefault();

  const num = QuestionNumber.value;
  const type = QuestionType.value;
  const categ = "17";

  const url = `https://opentdb.com/api.php?amount=${num}&category=${categ}&difficulty=${type}&type=multiple`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      questions = data.results;
      ContainerOne.classList.add("hide"), ContainerTwo.classList.remove("hide");
      currentQuestion = 1;
      score = 0;
      showQuestion(questions[0]);
    });

  timing = setInterval(updateCounting, 1000);

  console.log(num, type);
}

function showQuestion(ques) {
  questionDiv.innerHTML = ques.question;

  answers = [...ques.incorrect_answers, ques.correct_answer];
  answers.sort(() => Math.random() - 0.5);
  console.log(answers);
  Options.innerHTML = "";
  answers.forEach((answer) => {
    Options.innerHTML += ` <span class="radio-con">
   <span class="nego">${answer}</span>
    </span>`;
  });

  QuesNo.innerHTML = `<p style="font-size: 14px; font-weight: 700">${
    questions.indexOf(ques) + 1
  }</p>/${questions.length}`;

  const AnswerDiv = Options.querySelectorAll(".radio-con");
  AnswerDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (!answer.classList.contains("selected")) {
        AnswerDiv.forEach((answer) => {
          answer.classList.remove("selected");
        });

        answer.classList.add("selected");
        CheckBtn.style.opacity = 1;
      }
    });
  });
}
CheckBtn.addEventListener("click", () => {
  CheckAnswer();
});

CheckAnswer = () => {
  const selectedOne = document.querySelector(".radio-con.selected");
  const AllShow = document.querySelectorAll(".radio-con");
  console.log("working");
  if (selectedOne) {
    const alert = selectedOne.querySelector(".nego").textContent;
    CheckBtn.classList.add("hide");
    NextBtn.classList.remove("hide");
    if (alert == questions[currentQuestion - 1].correct_answer) {
      selectedOne.classList.add("correct");

      score++;
    } else {
      AllShow.forEach((show) => {
        const ShowChild = show.querySelector(".nego");
        if (
          ShowChild.textContent == questions[currentQuestion - 1].correct_answer
        ) {
          show.classList.add("correct");
        }
      });

      selectedOne.classList.add("incorrect");
    }
    const answerAll = document.querySelectorAll(".radio-con");
    answerAll.forEach((answer) => {
      answer.classList.add("checked");
    });
  }
};

NextBtn.addEventListener("click", () => {
  NextQuestion();
});

NextQuestion = () => {
  if (currentQuestion < questions.length) {
    currentQuestion++;

    showQuestion(questions[currentQuestion - 1]);
    CheckBtn.classList.remove("hide");
    NextBtn.classList.add("hide");
    console.log(score);
  } else {
    Endgame();
  }
};

function Endgame() {
  ContainerTwo.classList.add("hide");
  ContainerThree.classList.remove("hide");

  YourScore.innerHTML = score;
  TotalScore.innerHTML = questions.length;

  clearInterval(timing);
}

PlayAgain.addEventListener("click", () => {
  window.location.reload();
});

EndGame.addEventListener("click", () => {
  EndGame();
});
