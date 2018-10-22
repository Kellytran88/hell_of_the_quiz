$(document).ready(function() {
  // Hide and show
  function hide(x){
    $(x).addClass('hidden');
    // x.setAttribute('class','hidden')
  };

  function show(x){
    $(x).removeClass('hidden');
    // x.removeAttribute('class')
  };

  //SIGN UP//
  function signUp() {
    var name = document.getElementById('name').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var agreed = document.getElementById('agreed');
    var registration = document.getElementById('registration');
    var rule = document.getElementById('rule');

      if (name === '' || lastName === '' || email === '' ) {
        alert("Please check you've filled all the fields");
      } else if (agreed.checked === true) {
        hide(registration);
        show(rule);
      } else {
        alert ("You need to agree to the Terms and Conditions");
      }
    };
document.getElementById('register').onclick = function (e) {
  e.preventDefault();
  signUp();
};

//SET TIME
var total_seconde = 60;
var intervalId = -1;
var c_minute = parseInt(total_seconde/60);
var c_seconde = parseInt(total_seconde%60);
var rule = document.getElementById('rule');
var quizContainer = document.getElementById('quizContainer');
var final = document.getElementById('final');
var startButton = document.getElementById('start');

startButton.onclick = function() {
  intervalId = setInterval(checkTime, 1000)
};

function checkTime() {
  // document.getElementById("timeLeft")
  timer.innerHTML = 'Time left: ' + c_minute + ' min ' + c_seconde;
  if (total_seconde === 0){
    // clearInterval(intervalId);
    result.text("Ding ding ding – you're out of time! Do you want to give it another go?");
    hide(quizContainer);
    show(final);
  } else {
    hide(rule);
    show(quizContainer);
    total_seconde = total_seconde -1;
    c_minute = parseInt(total_seconde/60);
    c_seconde = parseInt(total_seconde%60);
  }
}

  // function checkTime() {
  //   $("#timeLeft").text('Time left: ' + c_minute + ' min ' + c_seconde);
  //     if (total_seconde === 0){
  //       $("#result").text("We're sorry but you ran out of time... Try again, it's not too late!");
  //       hide(quizContainer);
  //       show(final);
  //     } else {
  //       hide(rule);
  //       total_seconde = total_seconde -1;
  //       c_minute = parseInt(total_seconde/60);
  //       c_seconde = parseInt(total_seconde%60);
  //       setTimeout(checkTime, 1000);
  //       show(quizContainer);
  //     }
  // };
  // startButton.click(checkTime);



//question
var questions = [{
    "question": "bla bla?",
    "option1": "x",
    "option2": "x",
    "option3": "x",
    "option4": "x",
    "answer": "x"
  }, {
    "question": "x",
    "option1": "x",
    "option2": "x",
    "option3": "x",
    "option4": "x",
    "answer": "x"
  }, {
    "question": "y",
    "option1": "y",
    "option2": "y",
    "option3": "y",
    "option4": "y",
    "answer": "y"
  }, {
    "question": "a",
    "option1": "a",
    "option2": "a",
    "option3": "a",
    "option4": "a",
    "answer": "a"
  }, {
    "question": "t",
    "option1": "t",
    "option2": "t",
    "option3": "t",
    "option4": "t",
    "answer": "t"
  }, {
    "question": "w",
    "option1": "w",
    "option2": "w",
    "option3": "w",
    "option4": "w",
    "answer": "w"
  },
];

// QUIZ
var currentQuestionNum = 0;
var currentQuestion;
var userScore = 0;
var totQuestionScore = questions.length;
var totQuestion = 5;

var container = $("#quizContainer");
var questionEl = $("#question");
var opt1 = $("#opt1");
var opt2 = $("#opt2");
var opt3 = $("#opt3");
var opt4 = $("#opt4");
var nextButton = $("#nextButton");
var resultCont = $("#result");

function loadQuestionNum () {
  $("#questNumber").text("Question " + (++currentQuestionNum));
};
loadQuestionNum();

function loadQuestion () {
  var questionIndex = randomNum();
  currentQuestion = questions[questionIndex];
  // The next line removes the currentQuestion from the array
  // of questions hence the same question will not be shown again
  questions.splice(questionIndex, 1);
  // console.warn('questions', questions);
  questionEl.text(currentQuestion.question);
  opt1.text(currentQuestion.option1);
  opt1.prev().val(currentQuestion.option1);
  opt2.text(currentQuestion.option2);
  opt2.prev().val(currentQuestion.option2);
  opt3.text(currentQuestion.option3);
  opt3.prev().val(currentQuestion.option3);
  opt4.text(currentQuestion.option4);
  opt4.prev().val(currentQuestion.option4);
  $('input[type=radio]:checked').prop('checked', false);
};
loadQuestion();

function randomNum () {
  return Math.floor(Math.random() * questions.length);
};

function updateUserScore() {
  if ($('input[type=radio]:checked').val() === currentQuestion.answer){
    ++userScore;
  }
};

var result = $("#result");
var tryButton = document.getElementById('tryAgain');
  function showScore(){
    if (currentQuestionNum === 5 && userScore >= 4 && total_seconde > 0) {
      clearInterval(intervalId);
      result.text("Congrats, you got more than four correct answers! Head on over to the Badoo stand to collect your prize!");
      hide(tryButton);
    } else {
      // my else is (currentQuestionNum === 5 && userScore < 4 && total_seconde > 0)
      clearInterval(intervalId);
      result.text("So close! You need at least four correct answers to win a prize – but it's not too late to try again!");
    };
  }

var timer = document.getElementById('timeLeft');
function loadNextQuestion () {
  var selectOption = $('input[type=radio]:checked');
  var quizContainer = document.getElementById('quizContainer');
  var final = document.getElementById('final');

    if (currentQuestionNum === 5 && userScore <=4) {
      hide(quizContainer);
      hide(timer);
      showScore();
      show(final);
      // stop the Timer
      // stop reloading the question
    } else if (selectOption.length === 1) {
      updateUserScore();
      // ++currentQuestionNum;
      // It’s basically adding 1 to the value of currentQuestionNum
      loadQuestion();
      loadQuestionNum();
    } else {
      alert("Please choose an answer.");
    }
  };
$("#nextButton").click(loadNextQuestion);
});
