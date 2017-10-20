var fs = require("fs");

var output;

var Letter = function(letter, space) {
    this.guess = false;
    this.letter = letter;
};
 module.exports = Letter;