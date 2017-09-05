const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
// // const expressValidator = require('express-validator');
const session = require('express-session');
const app = express();
const wordList = require('./models/words');


let wordLine = []
let letterGuessed = [];
let display = [];
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
  guessedNum=''
  console.log('guessedNum in new game ', guessedNum);
  word.forEach(function(e) {
    console.log("eeee in newgame", e);
    wordLine.push('_ ')
  })
  console.log('wordLine in new game, dashes ß', wordLine);

  return
}

app.get('/', function(req, res) {
  req.session.winner = 0;
  console.log("oooooooo", req.session.winner);
  newWordMachine()
  res.render('index', {
    wordLine: wordLine
  })
})


app.post('/guessing', function(req, res) {
  console.log("this is a wordLine", wordLine);

  let guessedNum = (word.length + 3) - (letterGuessed.length)
  console.log("guessedNum inside the loss ", guessedNum);
  if (guessedNum === 0) {
    console.log("inside if statement to the loss");
    res.redirect('/loss')
  }

  let letter = req.body.letter;



  for (var i = 0; i < word.length; i++) {
    word[i]
    if (word[i] === letter) {
      wordLine[i] = word[i]
      req.session.winner++;
    }
  }
  if (req.session.winner === word.length) {
    res.redirect('/win')
  } else {
    res.render('index', {
      wordLine: wordLine,
      letterGuessed: letterGuessed,
      display: display,
      guessedNum: guessedNum
    })
  }
  console.log("letter", letter);
  letterGuessed.push(letter);
  console.log('guesssssneed', guessedNum);


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
  req.session.winner = 0;
  res.render('index')
  })



app.listen(3000, function() {
  console.log('Successfully started express application!');
})
