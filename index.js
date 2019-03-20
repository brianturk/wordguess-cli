require("dotenv").config();
let word = require("./word.js");
let LettersGuessed = require('./lettersGuessed.js')
let axios = require("axios");
let inquirer = require("inquirer");

var tries;
var word2Guess;
var lettersGuessed;
var randomWordApiKey = process.env.RANDOM_WORD_KEY;


console.log('');
line();
console.log('** Welcome to my word guessing game!')
line();

playGame(word2Guess)


function playGame(word2Guess) {

    axios
        .get('https://random-word-api.herokuapp.com/word?key=' + randomWordApiKey + '&number=1')
        .then(function (words) {

            if (words.data[0] != "") {
                word2Guess = new word.Word(words.data[0].toLowerCase());

                lettersGuessed = new LettersGuessed.LettersGuessed();
                tries = 10;

                inGame(word2Guess);
            } else {
                console.log('Error connecting to the random word server.  Please try again later :(')
            }

        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}


function inGame(word2Guess) {
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
                    } else if (!reg.test(charGuessed)) {
                        return 'Guess letters only!'
                    } else if (lettersGuessed.didGuess(charGuessed)) {
                        return 'Letter guessed already!'
                    } else {
                        return true;
                    }
                }
            }
        ])
        .then(function (userGuess) {
            var gotOne = word2Guess.guess(userGuess.letter.toLowerCase());

            if (word2Guess.word() === word2Guess.correctWord) var gotWord = true
            else var gotWord = false

            if (!gotOne) {
                tries--;
            }


            if ((gotWord) || (tries === 0)) {

                if (gotWord) {
                    console.log('');
                    console.log(word2Guess.word());
                    line();
                    console.log('** You got it!!!!!');
                    line();
                } else {
                    line();
                    console.log('** You lost :(');
                    console.log('** The word was "' + word2Guess.correctWord + '"');
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
                        if (response.playAgain) playGame(word2Guess)
                    })

            } else {
                if (!gotOne) {
                    if (tries === 1) var tryWord = ' try'
                    else var tryWord = ' tries'

                    console.log('Letter not found.  You have ' + tries + tryWord + ' left');
                }
                inGame(word2Guess);
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