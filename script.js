/* ---------- DOM refs ---------- */
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answer-buttons");
const scoreEl = document.getElementById("right-answers");

/* ---------- state ---------- */
let shuffledQuestions;
let currentIndex;
let score = 0;

/* ---------- event listeners ---------- */
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentIndex++;
  setNextQuestion();
});

/* ---------- game flow ---------- */
function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentIndex = 0;
  score = 0;
  scoreEl.textContent = "0";
  questionEl.classList.remove("hide");
  answersEl.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentIndex]);
}

function resetState() {
  clearStatus(document.body);
  nextButton.classList.add("hide");
  answersEl.innerHTML = ""; // clear old buttons
}

function showQuestion(questionObj) {
  questionEl.textContent = questionObj.question;
  questionObj.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.classList.add("btn");
    if (answer.correct) btn.dataset.correct = true;
    btn.addEventListener("click", selectAnswer);
    answersEl.appendChild(btn);
  });
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === "true";

  setStatus(document.body, correct);
  Array.from(answersEl.children).forEach((btn) =>
    setStatus(btn, btn.dataset.correct === "true")
  );

  if (correct) {
    score++;
    scoreEl.textContent = score;
  }

  if (currentIndex < shuffledQuestions.length - 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.textContent = "Restart";
    startButton.classList.remove("hide");
  }
}

/* ---------- helpers ---------- */
function setStatus(element, isCorrect) {
  clearStatus(element);
  element.classList.add(isCorrect ? "correct" : "wrong");
}

function clearStatus(element) {
  element.classList.remove("correct", "wrong");
}

/* ---------- data ---------- */
const questions = [
  {
    question: "Which of these is a JavaScript framework?",
    answers: [
      { text: "Python", correct: false },
      { text: "Django", correct: false },
      { text: "React", correct: true },
      { text: "Eclipse", correct: false },
    ],
  },
  {
    question: "Who is the Prime Minister of India?",
    answers: [
      { text: "Narendra Modi", correct: true },
      { text: "Rahul Gandhi", correct: false },
    ],
  },
  {
    question: "What is 4 × 3?",
    answers: [
      { text: "6", correct: false },
      { text: "12", correct: true },
      { text: "5", correct: false },
      { text: "10", correct: false },
    ],
  },
];
