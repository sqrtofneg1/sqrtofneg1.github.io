//Credit to Ian Lenehan's tutorial https://www.youtube.com/watch?v=j7OhcuZQ-q8
document.addEventListener("DOMContentLoaded", () => {

  let guessedWords = [[]];
  let availableSpace = 1;

  let guessedWordCount = 0;

  let word = "sowon";

  createSquares();
  addKeyboardClicks();
  loadLocalStorage();

  function loadLocalStorage() {
    guessedWordCount =
      Number(window.localStorage.getItem("guessedWordCount")) ||
      guessedWordCount;
    availableSpace =
      Number(window.localStorage.getItem("availableSpace")) || availableSpace;
    guessedWords =
      JSON.parse(window.localStorage.getItem("guessedWords")) || guessedWords;

    const storedBoardContainer = window.localStorage.getItem("boardContainer");
    if (storedBoardContainer) {
      document.getElementById("board-container").innerHTML =
        storedBoardContainer;
    }

    const storedKeyboardContainer =
      window.localStorage.getItem("keyboardContainer");
    if (storedKeyboardContainer) {
      document.getElementById("keyboard-container").innerHTML =
        storedKeyboardContainer;

      addKeyboardClicks();
    }
  }

  function preserveGameState() {
    window.localStorage.setItem("guessedWords", JSON.stringify(guessedWords));

    const keyboardContainer = document.getElementById("keyboard-container");
    window.localStorage.setItem(
      "keyboardContainer",
      keyboardContainer.innerHTML
    );

    const boardContainer = document.getElementById("board-container");
    window.localStorage.setItem("boardContainer", boardContainer.innerHTML);
  }

  function getIndicesOfLetter(letter, arr) {
    const indices = [];
    let idx = arr.indexOf(letter);
    while (idx != -1) {
      indices.push(idx);
      idx = arr.indexOf(letter, idx + 1);
    }
    return indices;
  }

  function getTileClass(letter, index, currentWordArray) {
    const isCorrectLetter = word
      .toUpperCase()
      .includes(letter.toUpperCase());

    if (!isCorrectLetter) {
      return "incorrect-letter";
    }

    const letterInThatPosition = word.charAt(index);
    const isCorrectPosition =
      letter.toLowerCase() === letterInThatPosition.toLowerCase();

    if (isCorrectPosition) {
      return "correct-letter-in-place";
    }

    const isGuessedMoreThanOnce =
      currentWordArray.filter((l) => l === letter).length > 1;

    if (!isGuessedMoreThanOnce) {
      return "correct-letter";
    }

    const existsMoreThanOnce =
      currentWord.split("").filter((l) => l === letter).length > 1;

    // is guessed more than once and exists more than once
    if (existsMoreThanOnce) {
      return "correct-letter";
    }

    const hasBeenGuessedAlready = currentWordArray.indexOf(letter) < index;

    const indices = getIndicesOfLetter(letter, currentWord.split(""));
    const otherIndices = indices.filter((i) => i !== index);
    const isGuessedCorrectlyLater = otherIndices.some(
      (i) => i > index && currentWordArray[i] === letter
    );

    if (!hasBeenGuessedAlready && !isGuessedCorrectlyLater) {
      return "correct-letter";
    }

    return "incorrect-letter";
  }

  function getCurrentWordArray() {
    const numOfGuessedWords = guessedWords.length;
    return guessedWords[numOfGuessedWords - 1];
  }

  function updateGuessedLetters(letter) {
    const currentWordArray = getCurrentWordArray();
    
    if (currentWordArray && currentWordArray.length < 5) {
      currentWordArray.push(letter);
      const availableSpaceElement = document.getElementById(availableSpace);
      availableSpace = availableSpace + 1;
      availableSpaceElement.textContent = letter;
    }
  }

  function createSquares() {
    const gameBoard = document.getElementById("board");
    
    for (let i = 0; i < 20; i++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.classList.add("animate__animated");
      square.setAttribute("id", i + 1);
      gameBoard.appendChild(square);
    }
  }

  function handleSubmitWord() {
    const currentWordArray = getCurrentWordArray();
    if (currentWordArray.length !== 5) {
      window.alert("Word must be 5 letters");
      return;
    }

    const currentWord = currentWordArray.join("");


    const firstLetterId = guessedWordCount * 5 + 1;
    const interval = 250;
    currentWordArray.forEach((letter, index) => {
      setTimeout(() => {
        const tileClass = getTileClass(letter, index, currentWordArray);
        if (tileClass) {
          const letterId = firstLetterId + index;
          const letterElement = document.getElementById(letterId);
          letterElement.classList.add("animate__flipInX");
          letterElement.classList.add(tileClass);

          const keyboardElement = document.querySelector(`[data-key=${letter}]`);
          keyboardElement.classList.add(tileClass);
        }

        if (index === 4) {
          preserveGameState();
        }
      }, interval * index)
    });

    guessedWordCount += 1;

    if (currentWord === word) {
      setTimeout(() => {
        window.alert("Congratulations!");
      }, 1500)
    }
    
    if (guessedWords.length >= 4) {
      setTimeout(() => {
        window.alert("Sorry, you have no more guesses left!");
      }, 1500)
    }

    guessedWords.push([]);
  }

  function handleDeleteLetter() {
    const currentWordArray = getCurrentWordArray();
    const removedLetter = currentWordArray.pop();

    if (removedLetter) {
      guessedWords[guessedWords.length - 1] = currentWordArray;

      const lastLetterElement = document.getElementById(String(availableSpace - 1));
  
      lastLetterElement.textContent = "";
  
      availableSpace = availableSpace - 1;
    }
  }
  
  function addKeyboardClicks() {
    const keys = document.querySelectorAll(".keyboard-row button");
    for (let i = 0; i < keys.length; i++) {
      keys[i].addEventListener("click", ({ target }) => {
        const key = target.getAttribute("data-key");

        if (key === "enter") {
          handleSubmitWord();
          return;
        }

        if (key === "del") {
          handleDeleteLetter();
          return;
        }

        updateGuessedLetters(key);
      });
    }
  }
})