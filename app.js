const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
// // const expressValidator = require('express-validator');
const session = require('express-session');
const app = express();
const wordList = require('./models/words');


let wordLine = []
let letterGuessed = [];
let word= []



app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({
  extended: false
}));
// app.use(expressValidator());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

function newWordMachine() {
  wordLine =[]
  console.log('wordLine in new game', wordLine);
  word = wordList[Math.floor(Math.random() * wordList.length)].split("")
  console.log('word', word);
  letterGuessed = [];
  console.log('letterGuessed in new game', letterGuessed);
  word.forEach(function(e) {
    console.log("eeee in newgame", e);
    wordLine.push('_ ')
  })
  return
}

app.get('/', function(req, res) {
  req.session.winner = 0;
  req.session.guessesRemaining = 8
  console.log("oooooooo", req.session.guessesRemaining);
  newWordMachine()
  res.render('index', {
    wordLine: wordLine
  })
})


app.post('/guessing', function(req, res) {
  console.log("this is a wordLine", wordLine);

  console.log("guessedNum inside the guess ", req.session.guessesRemaining);

  let letter = req.body.letter;
    req.checkBody('letter', "You must type something").notEmpty();
    req.checkBody('letter', "It must be a letter").isAlpha();
    let errors = req.validationErrors();


  for (var i = 0; i < word.length; i++) {
    if (errors) {
      res.render('index', {
        errors: errors
      });
    }
    if (word[i] === letter) {
      wordLine[i] = word[i]
      req.session.winner++;
    }
    else if (word[i] !== letter){
      letterGuessed.push(letter)
    }
  }
  if (letterGuessed === 8) {
    console.log("inside if statement to the loss");
    res.redirect('/loss')
  }
  if (req.session.winner === word.length) {
    res.redirect('/win')
  } else {
    req.session.guessesRemaining--;
console.log("guesses remaining before the render", req.session.guessesRemaining);
console.log("letterGuessed", letterGuessed);
    res.render('index', {
      wordLine: wordLine,
      letterGuessed: letterGuessed,
      guessedNum: (8-letterGuessed.length)
    })
  }
  console.log(word);

})
app.get('/win', function(req, res) {
  res.render('win')
})

app.get('/loss', function(req, res) {
  console.log('inside the get of the loss');
  res.render('loss')
})

console.log("after wordLine", wordLine);
app.post('/newgame', function(req, res) {
  newWordMachine()
  req.session.guessesRemaining= 8;
  req.session.winner = 0;
  res.render('index')
  })



app.listen(3000, function() {
  console.log('Successfully started express application!');
})
