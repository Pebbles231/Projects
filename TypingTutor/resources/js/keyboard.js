const keyboardValue = document.querySelectorAll('.key');
const excersiseArea = document.getElementById('practice-area');
const startButton = document.getElementById('start-button');
const inputField = document.getElementById('textInput')
const timerElement = document.getElementById('timer')
//-----
//keyboard start

//this is to detect if a button is pressed so that the key is pressed down
//if a button is pressed a class is added to the respective dom element
//via a data key attribute



$(document).keydown(function(event) {
  let keyCode = event.keyCode;
  let key = event.key;
  keyboardValue.forEach((item) => {
      if (keyCode == item.dataset.key){
        $(item).addClass("key-pressed");
      }
  });
});
//this is to detect if the button is released, so that the buttom goes up again
//if a button is released a class is removed from the respective dom element
//via a data key attribute

$(document).keyup(function(event) {
  let keyCode = event.keyCode;
  keyboardValue.forEach((item) => {
      if (keyCode == item.dataset.key){
        $(item).removeClass("key-pressed");
      }
  })
});
//------
//keyboard end

//------
//start of the Excersise
//setting up the arrays that are used to create the excerises of each step
const arrayStep1 = ["a", "s", "d", "f", "g"];

//function to create the arrays
function createExcersiseArray(arr) {
  let array = []
  for (let i = 1; i < 55; i++) {
    if (i % (Math.floor(Math.random() * 5)+2) == 0) {
      array.push(' ')
    }
    array.push(arr[Math.floor(Math.random() * arr.length)])
  }
  return array;
}
//setting up the startTime with the button click
let startTime
//defining myTimer var outside of the function, so that other functions can
//to stop the timer
var myTimer
//start button to start the excersise
startButton.addEventListener('click', () => {
  startButton.textContent = 'Restart';
  let excersiseArray = createExcersiseArray(arrayStep1);
  let fragment = document.createDocumentFragment();
  //removes any existing previous excersises
  while(excersiseArea.firstChild) {
    excersiseArea.removeChild(excersiseArea.firstChild);
  };
  //This is to create the text that is printed to the screen from the Array
  excersiseArray.forEach((item) => {
    let span = document.createElement('span');
    $(span).addClass('excersise-text')
    span.textContent = item;
    fragment.appendChild(span);
  })
  excersiseArea.appendChild(fragment);
  //clears the previous input and let's the user edit the input field again
  //also it automatically focuses the input field so that the user can start
  //typing
  inputField.value = null;
  inputField.readOnly = false;
  inputField.focus()
  //sets the start time to the time the button is clicked which is used to have accurate second counter
  // and starts the timer
  startTime = new Date()
  myTimer = setInterval(startTimer, 1000)
});

//This is the input field below the excersise, which takes the user input and
//then compares it to the exersise
//once all span elements have a correct class, the timer is stopped and the
//input field becomes read only
inputField.addEventListener('input', () => {
  const arrayInput = excersiseArea.querySelectorAll('span');
  const arrayValue = textInput.value.split('');
  let incorrectCounter = 0;
  arrayInput.forEach((excersiseSpan, index) => {
  const excersiseChar = arrayValue[index];
  if (excersiseChar == null) {
    excersiseSpan.classList.remove('correct');
    excersiseSpan.classList.remove('incorrect');
    } else if (excersiseChar == excersiseSpan.innerText) {
        excersiseSpan.classList.add('correct')
        excersiseSpan.classList.remove('incorrect')
    } else {
        excersiseSpan.classList.remove('correct');
        excersiseSpan.classList.add('incorrect');
        incorrectCounter++;
    }
  });
  if ($(excersiseArea).children().length === $('.correct').length) {
    inputField.readOnly = true;
    clearInterval(myTimer);
  }
});

//function which the timer can call to create the
function startTimer() {
  timerElement.innerText = getTimerTime()
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}
