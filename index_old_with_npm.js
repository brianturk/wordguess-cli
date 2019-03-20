let word = require("./word.js");
let randomWords = require('random-words');
let inquirer = require("inquirer");


var tries;
var word2Guess;
var startGame = true;
var words;
var lettersGuessed;

LettersGuessed = function() {
    this.letters = [],
    this.didGuess = function(letter) {
        let alreadyGuessed = false
        this.letters.forEach(function(guessed){
            if (letter === guessed) {
                alreadyGuessed = true;
            }
        })
        if (!alreadyGuessed) {
            this.letters.push(letter);
        }
        return alreadyGuessed;
    }
}

console.log('');
line();
console.log('** Welcome to my word guessing game!')
line();

playGame(word2Guess)


function playGame(word2Guess) {

    if (startGame) {
        startGame = false

        //Get random word to use in game
        words = randomWords({ min: 5, max: 20, exactly: 1 });
        word2Guess = new word.Word(words[0].toLowerCase());

        lettersGuessed = new LettersGuessed();
        tries = 10;

        // console.log(words[0]);
    }

    console.log('');
    console.log(word2Guess.word());
    inquirer
        .prompt([
            {
                message: 'Guess a letter: ',
                name: 'letter',
                validate: function (input) {
                    var charGuessed = input.toLowerCase();
                    var reg = /^[a-zA-Z]+$/
                    if (charGuessed.length > 1) {
                        return 'Guess only one letter!'
                    } else if (!reg.test(charGuessed)){
                        return 'Guess letters only!'
                    }  else if (lettersGuessed.didGuess(charGuessed)) {
                        return 'Letter guessed already!'
                    } else {
                        return true;
                    }
                }
            }
        ])
        .then(function (userGuess) {
            var gotOne = word2Guess.guess(userGuess.letter.toLowerCase());

            let gotWord = true;
            word2Guess.letters.forEach(function (letters) {
                if (!letters.guessedLetter) {
                    gotWord = false;
                }
            })

            if ((gotWord) || (tries === 1)) {
                if (gotWord) {
                    console.log('');
                    console.log(word2Guess.word());
                    line();
                    console.log('** You got it!!!!!');
                    line();
                } else {
                    line();
                    console.log('** You lost :(');
                    console.log('** The word was "' + words[0] + '"');
                    line();
                }

                console.log(' ');
                //Start a new game?
                inquirer
                    .prompt([
                        {
                            type: 'confirm',
                            message: 'Do you want to play again?',
                            name: 'playAgain'
                        }
                    ])
                    .then(function (response) {
                        if (response.playAgain) {
                            startGame = true;
                            playGame(word2Guess)
                        }
                    })

            } else {
                if (!gotOne) {
                    tries--;
                    if (tries === 1) {
                        var tryWord = ' try'
                    } else {
                        var tryWord = ' tries'
                    }
                    console.log('Letter not found.  You have ' + tries + tryWord + ' left');
                }
                playGame(word2Guess);
            }
        })

}



function line(numStars) {
    if (!numStars) {
        var numStars = 40;
    }
    let starLine = '';
    for (let x = 0; x < numStars; x++) {
        starLine += '*';
    }
    console.log(starLine);
}