const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const quizContainer = document.getElementById("quiz-container");
const overlay = document.getElementById("overlay");

let shuffledQuestions, currentQuestionIndex, timeOutID;

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

export function startQuiz() {
  clearTimeout(timeOutID);
  overlay.style.display = "flex";
  startGame();
}

export function startGame() {
  shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 1);
  currentQuestionIndex = 0;
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex) {
    nextButton.classList.add("hide");
    timeOutID = setTimeout(function () {
      overlay.style.display = "none";
    }, 800);
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "java.util.Collection je:",
    answers: [
      { text: "Class", correct: false },
      { text: "Interface", correct: true },
    ],
  },
  {
    question: `??ta ??e biti rezultat izvr??avanja koda?
    static void main(String args[]) {
        System.out.printin(this);
    }`,
    answers: [
      { text: "this", correct: false },
      { text: "Compile time error", correct: true },
    ],
  },
  {
    question: "Koji od ponu??enih interfejsa NIJE deo spring-data-commons?",
    answers: [
      { text: "JpaRepository", correct: true },
      { text: "PagingAndSortingRepository", correct: false },
    ],
  },
  {
    question: "Koja od ponu??enih tvrdnji NIJE istinita u Spring Boot-u?",
    answers: [
      {
        text: "Dependency Injection se mo??e postignuti kori????enjem @Configuration anotacije",
        correct: true,
      },
      {
        text: "Dependency Injection se mo??e postignuti kori????enjem @Autowired anotacije",
        correct: false,
      },
    ],
  },
  {
    question: `??ta ??e ove dve komande ispisati? 
        console.log(0.1 + 0.2);
        console.log(0.1 + 0.2 == 0.3);`,
    answers: [
      {
        text: "??0.30000000000000004, false",
        correct: true,
      },
      {
        text: "0.30000000000000004, true",
        correct: false,
      },
    ],
  },
  {
    question: `Koji je rezultat slede??e funkcije?
        (function() {
            console.log(1);
            setTimeout(function(){console.log(2)}, 1000);
            setTimeout(function(){console.log(3)}, 0);
            console.log(4);
        })();`,
    answers: [
      {
        text: "1 3 2 4",
        correct: false,
      },
      {
        text: "1 4 3 2",
        correct: true,
      },
    ],
  },
  {
    question: `??ta ce biti ispisano nakon izvr??enja ovih komandi?
        console.log(false == '0')
        console.log(false === '0')`,
    answers: [
      {
        text: "true, false",
        correct: true,
      },
      {
        text: "false, true",
        correct: false,
      },
    ],
  },
  {
    question: `??ta ??e biti ispisano na izlazu?
        name = ???Pera??? ?? ???Zika???;`,
    answers: [
      {
        text: "Pera",
        correct: true,
      },
      {
        text: "Zika",
        correct: false,
      },
    ],
  },
  {
    question: `??ta ??e biti ispisano na izlazu?
        a = new int[] { 0, ???0??? };
        Console.WriteLine(a[0] + a[1]);
    `,
    answers: [
      {
        text: "0",
        correct: false,
      },
      {
        text: "48",
        correct: true,
      },
    ],
  },
  {
    question: `??ta ??e biti ispisano na izlazu?
        var zero = 0;
        try{
            Console.WriteLine(42 / 0.0);
            Console.WriteLine(42.0 / 0);
            Console.WriteLine(42 / zero);
        }catch (DivideByZeroException){
            Console.WriteLine(???DivideByZeroException???);
        }`,
    answers: [
      {
        text: `Infinity
            Infinity 
            Infinity`,
        correct: false,
      },
      {
        text: `Infinity
             Infinity
             DivideByZeroException`,
        correct: true,
      },
    ],
  },
  {
    question: "??ta je load-ballancing?",
    answers: [
      {
        text: "Efikasno raspore??ivanje dolaze??eg saobra??anja na vi??e replika u okviru jedne grupe.",
        correct: true,
      },
      {
        text: " Efikasno raspore??ivanje dolaze??eg saobra??anja na vi??e replika u okviru vi??e grupa.",
        correct: false,
      },
    ],
  },
  {
    question: "??ta je horizontalno skaliranje?",
    answers: [
      {
        text: "Pokretanje dodatnih replika postoje??e instance kako bi se smanjilo optere??enje te instance",
        correct: true,
      },
      {
        text: "Pove??avanje procesorske mo??i ili memorije postoje??e instance kako bi se smanjilo optere??enje iste.",
        correct: false,
      },
    ],
  },
];
