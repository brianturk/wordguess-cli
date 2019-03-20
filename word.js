let letter = require("./letter.js");

exports.Word = function(word) {
    this.letters = [],
    this.correctWord = word,     //Put in here to show if the person gets the word wrong.
    this.init = function(word) {
        for(let x=0; x < word.length; x++) {
            let newLetter = new letter.Letter();
            newLetter.letter = word.substr(x,1);
            this.letters.push(newLetter);
        }
    },
    this.word = function() {
        let word = "";
        this.letters.forEach(function (letter) {
            word += letter.displayChar();
        });
        return word
    }
    this.guess = function(userGuess) {
        var gotOne = false;
        this.letters.forEach(function (letter) {
            if (letter.guess(userGuess)) {
                gotOne = true;
            };
        });

        return gotOne;
    }
    this.init(word);
  };
