const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const wordList = require('./models/words');
const app = express();
// const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");


// VARIABLES ^^

// BOILER PLATE
// mustache
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
// body-parser
app.use(bodyParser.urlencoded({
  extended: false
}));
// validator
app.use(expressValidator());
// session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
// BOILER PLATE
//


app.listen(3000, function() {
  console.log('Successfully started express application!');
})
