const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const app = express();
const wordList = require('./models/words');
let wordLine = []
let index={}
let letterGuessed = []
let word = wordList[Math.floor(Math.random() * wordList.length)].split("")

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

function newGame() {
  console.log("theis is the wr", word);
  let letterGuessed = []
  let display = [];

  word.forEach(function(e) {
  wordLine.push('_ ')
  })
}

app.get('/', function(req, res) {
  req.session.winner = 0;
  if (!req.session.index) {
    req.session.index = index;
    newGame();
    res.render('index', {
      wordLine: wordLine
    });
  }
  else {
    res.render('index', {
      wordLine: wordLine
    })
  }
})

app.post('/guessing', function(req, res) {
  console.log("this is a wordline", wordLine);

  let letter = req.body.letter;
  req.checkBody('letter', "You must type something").notEmpty();
  req.checkBody('letter', "It must be a letter").isAlpha();
  let errors = req.validationErrors();

  let guessedNum = (wordLine.length + 2) - (letterGuessed.length)
  if (guessedNum < 1) {
    res.render('/loss')
  }


  for (var i = 0; i < word.length; i++) {
    if (errors) {
      console.log(errors);
      res.render('index', {
        errors: errors
      });
    }
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
      guessedNum: guessedNum
    })
  }
  console.log("letter", letter);
  letterGuessed.push(letter);
  console.log('guesssssneed', guessedNum);


  console.log(word);


})
app.post('/loss', function(req, res) {
  res.send("you lose")
})
app.get('/win', function(req, res) {
  res.render('win')
})

app.post('/newgame', function(req, res) {
  res.redirect('/')
})


app.listen(3000, function() {
  console.log('Successfully started express application!');
})
