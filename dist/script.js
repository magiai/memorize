let wordList = [];

// ----------------------addition of words-------------------------------
function addWord(word, definition) {

  const listContainer = document.querySelector(".list-container");

  const wordListElement = document.createElement('div');
  wordListElement.classList.add('list-item');
  wordListElement.innerText = word + " - " + definition;
  wordListElement.setAttribute('contenteditable', 'true');

  listContainer.appendChild(wordListElement);

  wordList.push({
    index: wordList.length,
    word: word,
    definition: definition,
  })

}
// ----------------------repetition of words-------------------------------
const startRepeating = function() {

  const repetitionDisplayer = document.querySelector(".repetition-displayer");
  const definitionInput = document.querySelector('#repeat-definition');

  const wordOutput = document.createElement('p');
  wordOutput.classList.add('.word-output');

  const checkButton = document.createElement('button');
  checkButton.classList.add('.check-button');
  checkButton.innerText = "Sprawdź";
  repetitionDisplayer.appendChild(checkButton);


  let randomPairNumber = Math.floor(Math.random() * wordList.length);

  for (let i = 0; i < wordList.length; i++) {

    let item = wordList[i];

    if (randomPairNumber === item.index) {
      wordOutput.innerText = wordList[randomPairNumber].word;
      repetitionDisplayer.appendChild(wordOutput);

      const checkDefinition = function() {
        console.log(definitionInput.value);
      };

      checkButton.addEventListener('click', checkDefinition);
    };
  }
};

// ----------------variables for the first display--------------------
const previousWords = [];

const wordDisplayer = document.querySelector('.word-displayer');
const displayElement = document.createElement('div');
displayElement.classList.add('display-word');

const wordPresentation = document.createElement('p');
const definitionPresentation = document.createElement('p');

const startButton = document.querySelector(".start-learning");

// --------------------first set of words----------------------------

const displayWord = function() {

  let randomPairNumber = Math.floor(Math.random() * wordList.length);

  if (previousWords.some(el => el === randomPairNumber)) {
    displayWord();
    return;
  }

  for (let i = 0; i < wordList.length; i++) {

    let item = wordList[i];

    if (randomPairNumber === item.index) {

      wordPresentation.innerText = wordList[randomPairNumber].word;
      definitionPresentation.innerText = wordList[randomPairNumber].definition;

      displayElement.appendChild(wordPresentation);
      displayElement.appendChild(definitionPresentation);
      wordDisplayer.appendChild(displayElement);

      startButton.innerHTML = "Dalej";

      //zapisywać ostani rekord - wstecz
      //usuwanie go z listy

      previousWords.push(wordList[randomPairNumber].index);
    }
  }

  //zmienić na jeśli indexy z previous pokrywają się z tymi z listy
  if (previousWords.length === wordList.length) {
    startButton.removeEventListener('click', displayWord);
    startButton.remove();
  }
}

// -------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {

  const addForm = document.querySelector("#add-words-form");
  const word = document.querySelector("#add-word");
  const definition = document.querySelector("#add-definition");

  addForm.addEventListener('submit', e => {
    e.preventDefault();

    // TODO obsłużyć błąd
    if (word.value && definition.value !== '') {
      addWord(word.value, definition.value);
      word.value = '';
      definition.value = '';
    }

    return false;
  });

  const startButton = document.querySelector(".start-learning");
  startButton.addEventListener('click', displayWord);

  const repeatButton = document.querySelector(".start-repeating");
  repeatButton.addEventListener('click', startRepeating);
});