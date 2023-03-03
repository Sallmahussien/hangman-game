// Create Letters
const lettters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lettersArray = Array.from(lettters);

const lettersContainer = document.querySelector(".letters");

lettersArray.forEach((letter) => {
  const letterSpan = document.createElement("span");
  letterSpan.innerHTML = letter;
  letterSpan.classList.add("letter-box");
  lettersContainer.appendChild(letterSpan);
});

// Creat Categories
const categoriesObject = {
  programming: [
    "javascript",
    "python",
    "go",
    "java",
    "php",
    "sql",
    "c",
    "r",
    "sql",
  ],
  movies: [
    "the godfather",
    "the dark night",
    "angry man",
    "fight club",
    "inception",
    "the matrix",
  ],
  people: ["salma", "kylie jenner", "cristiano ronaldo", "elon musk"],
  countries: ["egypt", "turkey", "palastine", "qatar", "jordan"],
};

const categoriesArray = Object.keys(categoriesObject);
const randomCategory =
  categoriesArray[Math.floor(Math.random() * categoriesArray.length)];
const categorySpan = document.querySelector(".category span");

categorySpan.innerHTML = randomCategory;

// generata random word from the category
const randomWord =
  categoriesObject[randomCategory][
    Math.floor(Math.random() * categoriesObject[randomCategory].length)
  ];

let wrongAttempts = 0;
let rightAttempts = 0;

// Score
let score = 0;
// window.localStorage.clear();
if (!window.localStorage.getItem("Score"))
  window.localStorage.setItem("Score", 0);

if (window.localStorage.getItem("Score") > 0) {
  document.querySelector(".highest-score span").innerHTML =
    window.localStorage.getItem("Score");
}

// Create guess letters span
const randomWordArray = Array.from(randomWord);
const lettersGuess = document.querySelector(".letters-guess");

randomWordArray.forEach((letter) => {
  const randomLettreSpan = document.createElement("span");
  lettersGuess.appendChild(randomLettreSpan);

  if (letter === " ") {
    rightAttempts++;
    randomLettreSpan.classList.add("space");
    randomLettreSpan.innerHTML = "-";
  }
});

//Handing clicking on letters
const guessLetterSpans = document.querySelectorAll(".letters-guess span");

const drawElement = document.querySelector(".the-draw");

document.addEventListener("click", (e) => {
  let status = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    randomWordArray.forEach((letter, letterIndex) => {
      if (letter === e.target.innerHTML.toLowerCase()) {
        status = true;

        guessLetterSpans[letterIndex].innerHTML = letter;

        rightAttempts++;
        score += 10;
      }
    });

    if (!status) {
      wrongAttempts++;
      score -= 10;

      drawElement.classList.add(`wrong-${wrongAttempts}`);

      document.getElementById("fail").play();

      if (wrongAttempts === 8) {
        endgame();
      }
    } else {
      document.getElementById("success").play();

      if (rightAttempts === randomWord.length) {
        endgame();
      }
    }
  }
  console.log(rightAttempts);
  console.log(score);
});

function endgame() {
  const popup = document.createElement("div");
  popup.className = "popup";
  document.body.appendChild(popup);

  const div = document.createElement("div");
  popup.appendChild(div);

  const popupText = document.createElement("p");
  if (wrongAttempts === 8) {
    popupText.innerHTML = `Game Over, The Word is ${randomWord}`;
  } else {
    if (score > window.localStorage.getItem("Score")) {
      window.localStorage.setItem("Score", score);
      popupText.innerHTML = `WOW! YOU GOT IT RIGHT.
      YOU RECORDED THE HIGHEST SCORE ${window.localStorage.getItem("Score")}`;
    } else {
      popupText.innerHTML = `WOW! YOU GOT IT RIGHT`;
    }
  }
  popupText.style.textAlign = "center";
  popupText.style.lineHeight = 1.5;
  popupText.style.margin = "10px";

  div.appendChild(popupText);

  const btn = document.createElement("button");
  btn.innerHTML = "New Game";

  div.appendChild(btn);

  btn.addEventListener("click", (e) => {
    popup.style.display = "none";
    location.reload();
  });
}
