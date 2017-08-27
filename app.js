const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
// // const expressValidator = require('express-validator');
const session = require('express-session');
const app = express();
const wordList = require('./models/words');

let word = wordList[Math.floor(Math.random() * wordList.length)].split("")
let letterGuessed = [];
let display = [];
console.log("theis is the wr", word);



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
  res.render('index', {
    word: word
  })
})




app.post('/guessing', function(req, res) {
  let letter = req.body.letter;
      for (var i = 0; i < word.length; i++) {
        word[i]
        if (word[i] === letter) {
          display.push(word[i])
        }
      }
      console.log("letter", letter);
      letterGuessed.push(letter)



  console.log(word);
  res.render('index', {
    word: word,
    letterGuessed: letterGuessed,
    display: display
  })
})

app.listen(3000, function() {
  console.log('Successfully started express application!');
})
