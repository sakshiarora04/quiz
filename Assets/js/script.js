var countDown = document.getElementById("timeleft");
var quizContainer = document.querySelector(".quiz");
var wrapper = document.querySelector(".wrapper");
var startButton = document.querySelector(".start-button");
var result = document.querySelector(".result");
var subButton = document.createElement("button");
var input = document.createElement("input");
var count;
var score;
var initials = [];
var initial;
var currentQuestionIndex = 0;

// Array of objects having questions and answers
var questions = [
  {
    question: " Commonly used data types do not include:",
    options: ["string ", "boolean", "alert", "numbers"],
    answer: 3,
  },
  {
    question: " The condition in an if/else statement is enclosed within ____ ",
    options: ["quotes ", "curly brackets ", "parentheses", "square brackets"],
    answer: 2,
  },
  {
    question:
      " String values must be enclosed within _____ when being assigned to variables.",
    options: ["commas ", "curly brackets", "quotes", "parenthesis"],
    answer: 3,
  },
  {
    question: "Arrays in javascript can be used to store",
    options: [
      "numbers and strings ",
      "other arrays",
      "booleans",
      "all of above",
    ],
    answer: 4,
  },
  {
    question: "A very helpful tool used during development and debuging for printing content to the debugger is: ",
    options: [
      "JavaScript ",
      "terminal/bash",
      " for loops",
      "console.log",
    ],
    answer: 4,
  }
];

// The init function is called when the page loads
function init() {
  getScores();  
}

// The startQuiz function is called when the start button is clicked
function startQuiz() {
  count = 70;
   //starts the timer
  startTimer();
  // Prevnts start button from being clicked when round is in progress
  startButton.style.display = ""; 
  displayQuiz(0);
}

// The setTimer function starts and stops the timer 
function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    count--;
    countDown.textContent = count;

    // Tests if time has run out
    if (count === 0) {
      countDown.textContent = count;
      clearInterval(timer);
      quizContainer.innerHTML = "";
      showScores();      
    }
  }, 1000);
}

// Display quiz question and options
function displayQuiz(qindex) {
  // create div and paragraph element
  for (var i = 0; i <= qindex; i++) {
    var divE1 = document.createElement("div");
    var pE1 = document.createElement("p");
    //define data index for question number
    pE1.setAttribute("data-index", i);
    pE1.setAttribute(
      "style",
      "font-weight: bolder; font-size: 35px; text-align:left"
    );
    quizContainer.innerHTML = "";
    pE1.textContent = questions[i].question;
    // paragraph containing question is child of div
    divE1.appendChild(pE1);
    quizContainer.appendChild(divE1);
    // Displaying options of question in button element
    questions[i].options.forEach((oindex, arr) => {
      const btn = document.createElement("button");
      btn.classList.add("btn");
      //set data index for option array
      btn.setAttribute("data-index", arr + 1);
      // oindex containing option value
      btn.textContent = arr + 1 + ". " + oindex;
      divE1.appendChild(btn);
    });
  }
}

//when option button gets clicked
quizContainer.addEventListener("click", function (event) {
  event.preventDefault();
  var element = event.target;
  // Checks if element is a button
  if (element.matches(".btn") === true) {
    //get the index of selected option in array of options
    var optionIndex = element.getAttribute("data-index");
    //selecting question index of clicked button of option 
    var quesIndex = element.parentElement.firstChild.getAttribute("data-index");
    //if answer key value of question object matches with selected option index of that question
    result.setAttribute("style","border-top:2px solid rgb(150, 142, 142) ");
    if (questions[quesIndex].answer === parseInt(optionIndex)) {
      result.textContent = "Correct!";
      setTimeout(() => {
        result.textContent = "";
        result.setAttribute("style","border-top:0 ");
      }, "500");
    } 
    else {
      result.textContent = "Wrong!";
      // deduct 15 on time if incorrect option gets selected 
      count = count - 15;
      if (count < 0) {
        count = 0;
        countDown.textContent = count;
        clearInterval(timer);
        quizContainer.innerHTML = "";
        showScores();
        setTimeout(() => {
          result.textContent = "";
          result.setAttribute("style","border-top:0 ");
        }, "500");
        return;
      }
      setTimeout(() => {
        result.textContent = "";
        result.setAttribute("style","border-top:0 ");
      }, "500");
    }
    //displays next question if time is not finished 
    nextquestion();
  }
});

function nextquestion() {
  currentQuestionIndex += 1;
  //if its last question
  if (currentQuestionIndex === questions.length) {
    removeLastQuestion();
    showScores();
  }
  else {
    displayQuiz(currentQuestionIndex);
  }
}
//remove question
function removeLastQuestion() {
  if (currentQuestionIndex > questions.length - 1) {
    quizContainer.innerHTML = "";
    countDown.textContent = count;
  }
}
  
function showScores() {
  score = count;
  // create form with label and input
  const br = document.createElement("br");
  const form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("style", "float:left");

  input.setAttribute("type", "text");
  input.setAttribute("id", "initials");
  input.setAttribute("name", "initials");
  input.setAttribute("placeholder", "Initials");

  const span = document.createElement("span");
  const label1 = document.createElement("label");
  label1.setAttribute("style", "float:left; margin:10px 0");
  label1.setAttribute("for", "initials");

  const label2 = document.createElement("label");
  label2.setAttribute("for", "initials");
  label2.setAttribute("style", "float:left");

  label1.textContent = "Your score is:";
  span.textContent = count;
  label2.textContent = "Enter initials: ";

  subButton.setAttribute("type", "submit");
  subButton.setAttribute(
    "style",
    "font-weight: bolder;padding:5px;margin: 5px;background-color: #0c3151; color: white"
  );
  subButton.textContent = "Submit";
  //append labels in form and input in label
  form.appendChild(document.createTextNode("All done!"));
  form.appendChild(br.cloneNode());
  form.appendChild(label1);
  label1.appendChild(span);
  form.appendChild(br.cloneNode());
  form.appendChild(label2);
  label2.appendChild(input);
  label2.appendChild(subButton);
  quizContainer.appendChild(form);
  clearInterval(timer);
}
//submit button to get the initial from input
subButton.addEventListener("click", (event) => {
  event.preventDefault();
  initial = {
    name: input.value.trim(),
    finScore: score,
  };
  //if input is empty 
  if (initial.name === "") {
    alert("Enter name");
    return;
  }
  // creates array of objects - initial containing name and finscore
  initials.push(initial);

  storeScores();
  window.location.href = "highscores.html";
});

// store score and initial name in local storage
function storeScores() {
    localStorage.setItem("initial-name", JSON.stringify(initials));
}

//function to get scores and initial from local storage
function getScores() {
  const initName = JSON.parse(localStorage.getItem("initial-name"));
  if (initName === null) {
    initials = [];
  } else {
    initials = initName;
  }
}

// Attach event listener to start button to call startQuiz function on click
startButton.addEventListener("click", startQuiz);
// call init function
init();
