// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

// const newPointStructure = {
//    A:1,
//    B:3,
//    C:3,
//    D:2,
//    E:1,
//    F:4,
//    G:2,
//    H:4,
//    I:1,
//    J:8,
//    K:5,
//    L:1,
//    M:3,
//    N:1,
//    O:1,
//    P:3,
//    Q:10,
//    R:1,
//    S:1,
//    T:1,
//    U:1,
//    V:4,
//    W:4,
//    X:8,
//    Y:4,
//    Z:10
// };

let newPointStructure = transform(oldPointStructure);
// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in oldPointStructure) {

         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }

      }
   }
   return letterPoints;
}

function initialPrompt() {
   wordInput = input.question("Let's play some scrabble! Enter a word: ");
   //console.log(oldScrabbleScorer(wordInput));
};
let simpleScorer = function (word) {
   word = word.toUpperCase()
   let simpleLetterPoints = 0;
   word = word.trim().split(" ").join()
   simpleLetterPoints += word.length
   return simpleLetterPoints;
}

let vowelBonusScorer = function (word) {
   word = word.toUpperCase()
   let vowelBonusPoints = 0;
   for (let i = 0; i < word.length; i++) {
      if ("AEIOU".includes(word[i])) {
         vowelBonusPoints += 3
      }
      else {
         vowelBonusPoints += 1
      }
   }
   return vowelBonusPoints
}

let scrabbleScorer = function (word) {
   word = word.toLowerCase()
   let scrabblePoints = 0;
   for (let item in newPointStructure) {
      for(let i=0;i<word.length; i++){
         if (word[i].includes(item)) {
               scrabblePoints += newPointStructure[item]
   
            }
         
      }
   }
   return scrabblePoints;
}


const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point",
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm",
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   console.log(`Which Scoring Agorithm would you like to use? 
                  0- ${scoringAlgorithms[0].description}
                  1- ${scoringAlgorithms[1].description}
                  2- ${scoringAlgorithms[2].description}
                `)
   let scorerSelection = input.question(`enter 0, 1, or 2: `);
   console.log(`The score for '${wordInput}': ${scoringAlgorithms[scorerSelection].scoringFunctions(wordInput)}`);
}

function transform(obj) {
   let newObj = {};
   for (let item in obj) {
      for (let i = 0; i < obj[item].length; i++) {
         newObj[obj[item][i].toLowerCase()] = Number(item);

      }//add key/value pair to an object within second loop

   }
   return newObj;
};


function runProgram() {
   //console.log(transform(oldPointStructure));
   //console.log(newPointStructure);
   initialPrompt();
   scorerPrompt();

}




// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
