var inquirer = require("inquirer");


var wordsList = ["fawaz", "terminator", "ahmed", "zedong", "aleena", "shehroze",
  "jasmine", "stephen", "jacob", "adam", "rui", "luis"];

var chosenWord = "";

var lettersInChosenWord = [];

var numBlanks = 0;

var blanksAndSuccesses = [];

var wrongGuesses = [];


var wins = 0;
var lossCounter = 0;
var numGuesses = 9;

inquirer.prompt([
    {
      type: "confirm",
      name: "begin",
      message: "Are you ready to play the Hangman game?"
    }
  ]).then(function (input) {
    if (input.begin) {
      console.log("Play the game")
      startGame();

      var letterGuessed = process.argv[2];
      inquirer.prompt([
      {
        type: "input",
        name: "userGuess",
        message:"Enter the desired letter"
      }
      ]).then(function (input) {

      checkLetters(letterGuessed);

      roundComplete();
      })
    } else {
      console.log("Bye, As you wish")
    }
  })


  function startGame() {
  
  numGuesses = 9;

  chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
  lettersInChosenWord = chosenWord.split("");
  
  numBlanks = lettersInChosenWord.length;

  
  console.log(chosenWord);

  
  blanksAndSuccesses = [];
  
  wrongGuesses = [];

  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }

  
  console.log(blanksAndSuccesses);


  console.log(numGuesses);

  blanksAndSuccesses.join(" ");
  console.log(blanksAndSuccesses);

  wrongGuesses.join(" ");
  console.log(wrongGuesses.join(" "))
}

function checkLetters(letter) {


  var letterInWord = false;


  for (var i = 0; i < numBlanks; i++) {
    if (chosenWord[i] === letter) {

      letterInWord = true;
    }
  }


  if (letterInWord) {


    for (var j = 0; j < numBlanks; j++) {


      if (chosenWord[j] === letter) {
        blanksAndSuccesses[j] = letter;
      }
    }

    console.log(blanksAndSuccesses);
  }

  else {

    wrongGuesses.push(letter);
    numGuesses--;
  }
}

function roundComplete() {


  console.log("WinCount: " + wins + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);


  console.log(numGuesses);

  blanksAndSuccesses.join(" ");
  console.log(blanksAndSuccesses);

  wrongGuesses.join(" ");
  console.log(wrongGuesses.join(" "))

  if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {

    wins++;
    alert("You win!");

    console.log(wins);
    startGame();
  }

  else if (numGuesses === 0) {

    lossCounter++;

    alert("You lose");

    console.log(lossCounter);

    startGame();
  }

}

