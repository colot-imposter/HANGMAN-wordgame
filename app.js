const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
// // const expressValidator = require('express-validator');
const session = require('express-session');
const app = express();
const wordList = require('./models/words');

let word = wordList[Math.floor(Math.random() * wordList.length)].split("")
console.log("theis is the wr", word);
let wordLine = []
let letterGuessed = [];

let display = [];





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
  saveUninitialized: true
}))

app.get('/', function(req, res) {
  word.forEach(function(e){
    wordLine.push('_ ')
  })
  res.render('index', {wordLine:wordLine})
})


app.post('/guessing', function(req, res) {
console.log(word);
if (guessedNum = 0){
  res.render('/loss')}

  let guessedNum = (word.length+2)-(letterGuessed.length)

  let letter = req.body.letter;
      for (var i = 0; i < word.length; i++) {
        word[i]
        if (word[i] === letter) {
          wordLine[i] = word[i]
        }
      }
      console.log("letter", letter);
      letterGuessed.push(letter);
      console.log('guesssssneed',guessedNum);


  console.log(word);
  res.render('index', {
    wordLine: wordLine,
    letterGuessed: letterGuessed,
    display: display,
    guessedNum: guessedNum
  })

})

app.post('/newgame', function(req, res){
  res.render('index')
})

app.listen(3000, function() {
  console.log('Successfully started express application!');
})
