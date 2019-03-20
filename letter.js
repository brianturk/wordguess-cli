exports.Letter = function() {
    this.guessedLetter = false,
    this.letter = "",
    this.displayChar = function() {
        if (this.guessedLetter) {
            return this.letter
        } else {
            return '-'
        }
    },
    this.guess = function(userGuess) {
        if (this.letter === userGuess) {
            this.guessedLetter = true
            return true
        } else {
            return false
        }
    }
  };