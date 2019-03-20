exports.LettersGuessed = function () {
    this.letters = [],
    this.didGuess = function (letter) {
        let alreadyGuessed = false
        this.letters.forEach(function (guessed) {
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