//requirements
var Word = require("./word");
var inquirer = require("inquirer");
var prompt = inquirer.createPromptModule();


var guessesLeft = 8;
var lettersGuessed = [];

var wordArray = ["fawaz", "eating", "kabab", "biryani", "chicken65", "salad", "capricious"];

var random = Math.floor(Math.random() * 8);
var answerWord = wordArray[random];
var blankWord = [];
var answerLetterArray = answerWord.split("");
var hangmanWord = new Word(answerWord);


for (var j = 0; j<answerLetterArray.length; j++){
    hangmanWord.addLetters(answerLetterArray[j]);
}

for (var k = 0; k<hangmanWord.keyWord.length; k++) {
    if (hangmanWord.keyWord[k].letter !== " ") {
        blankWord.push("_");
    } else {
        blankWord.push(" ");
    }
}
console.log("");
console.log(blankWord.join("  "));


function game(){
    prompt([
        {
            type: 'input',
            name: 'letter',
            message: "Enter a letter!"
        }

    ])
    .then(function(guess) {
        
        console.log(guess.letter);
        
            var sub = answerLetterArray.indexOf(guess.letter);
            if (sub !== -1) {
                for (z=0; z<answerLetterArray.length; z++) {
                    if (answerLetterArray[z] == guess.letter) {
                        blankWord[z] = guess.letter;
                       
                        if (blankWord.toString() == answerLetterArray.toString()) {
                            console.log(blankWord.join('  '));                            
                            console.log('you win');
                        }
                        }
                    }
                    console.log(blankWord.join('  '));
                    
                } else if ((sub === -1) && (lettersGuessed.indexOf(guess.letter) === -1)) { 
                guessesLeft--;
                console.log(" ");
                console.log("Wrong buddy! Guesses Remaining : " + guessesLeft);
                console.log(blankWord.join('  '));
                if (guessesLeft === 0) {
                    noGuessesLeft();
                }
            };

        if (guess.letter !== "") {
            if (lettersGuessed.indexOf(guess.letter) === -1) {
            lettersGuessed.push(guess.letter);
            } else {
                console.log('');
                console.log('');                
                console.log('You already guessed that letter. ITs your mistake that you loss a guess!.');
                guessesLeft--;
                console.log('');
                console.log('Guesses Remaining : ' + guessesLeft);
                console.log(blankWord.join('  '));                
                
                if (guessesLeft === 0) {
                    noGuessesLeft();
                }
            }
            if (guessesLeft > 0) {
                game();
            }    
        }
    });
}
console.log('');
game();
function noGuessesLeft() {
    prompt([
        {
            type: 'confirm',
            name: 'keepPlaying',
            message: 'You are out of guesses! Would you like to play again?',
            default: false
        }
    ]).then(function(user) {
        if (user.keepPlaying === true) {
            guessesLeft = 8;
            lettersGuessed = [];
            console.log('');
            game();
        }
        else {
            console.log("Thanks for playing! Have a nice day");
            process.exit();
        }
    });
}