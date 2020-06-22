// function countDown(fromNumber) {
//   console.log(fromNumber);
//
//   let nextNumber = fromNumber - 1;
//
//   if (nextNumber > 0) {
//     countDown(nextNumber);
//   }
//   console.log(fromNumber);
// }
// countDown(3);

let wordList = [];

// ----------------------addition of words-------------------------------
function addWord(word, definition) {

  const listContainer = document.querySelector(".list-container");

  const wordListElement = document.createElement('div');
  wordListElement.classList.add('list-item');
  wordListElement.innerText = word + " - " + definition;
  wordListElement.setAttribute('contenteditable', 'true');

  const deleteItem = document.createElement('span');
  deleteItem.classList.add('delete-icon')
  deleteItem.innerHTML = "&cross;"
  deleteItem.setAttribute('contenteditable', 'false');

  wordListElement.appendChild(deleteItem);
  listContainer.appendChild(wordListElement);

  //zrobić update listy bez elementu po usunięciu
  deleteItem.addEventListener('click', function() {
    wordListElement.remove();
  });

  wordList.push({
    index: wordList.length,
    word: word,
    definition: definition,
  });
}


const repetitionDisplayer = document.querySelector(".repetition-displayer");
repetitionDisplayer.style.display = "none";
const definitionInput = document.querySelector('#repeat-definition');

const wordOutput = document.createElement('p');
wordOutput.classList.add('.word-output');

//check
const checkButton = document.createElement('button');
checkButton.classList.add('.check-button');
checkButton.innerText = "Sprawdź";
repetitionDisplayer.appendChild(checkButton);

//feedback for user
const userFeedback = document.createElement('div');

// ----------------------repetition of words-------------------------------

const startRepeating = function() {

  repetitionDisplayer.style.display = "block";

  let randomPairNumber = Math.floor(Math.random() * wordList.length);
  console.log("Random number: " + randomPairNumber);

  wordOutput.innerText = wordList[randomPairNumber].word;
  console.log("Słowo: " + wordList[randomPairNumber].word);

  let checkDefinition = wordList[randomPairNumber].definition;
  console.log("definicja: " + checkDefinition);

  repetitionDisplayer.insertBefore(wordOutput, definitionInput);

  const firstIteration = [];

  definitionInput.addEventListener('change', function() {

    console.log("Change:" + definitionInput.change);
    console.log("Value:" + definitionInput.value);

    if(definitionInput.value !== '') {

      console.log("Input:" + definitionInput.value);

      //tutaj jest definicja z wcześniejszej tury - trzeba zrobić update
      console.log("Definicja w inpucie: " + checkDefinition);

      if (definitionInput.value === checkDefinition) {

        // checkButton.addEventListener('click', startRepeating);
        console.log("dobra pierwsza odpowiedź");

        userFeedback.innerHTML = "Correct answer &check;";
        repetitionDisplayer.appendChild(userFeedback);

        //delete item from repetition if was dispayed twice
        if (firstIteration.some(el => el === checkDefinition)) {
          wordList.splice(wordList[randomPairNumber].index, 1);

          console.log("dobre powtórzone, zawartość tabeli: " + wordList);
          return;
        }

        firstIteration.push(checkDefinition);
        definitionInput.value = '';
        console.log(firstIteration);
        startRepeating();

      } else {
        
        // checkButton.addEventListener('click', startRepeating);
        userFeedback.innerHTML = "Wrong answer &cross;";
        repetitionDisplayer.appendChild(userFeedback);

        definitionInput.value = '';
        console.log('źle');
        startRepeating();
      }
    }
  });
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
  // ----------------------------------------------------------------------

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