var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();


var Greet = require('./greetingsExpress')

var greetings = Greet()

//start the server
var server = app.listen(4008);

app.use(express.static('public'));

let PORT = process.env.PORT || 4000;

app.listen(PORT, function() {
  console.log('App starting on port', PORT);
});

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json())

//handlebars setup
app.engine('handlebars', exphbs({
  defaultLayout: 'main',

}));

app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  res.render('greetings', );
});;

app.post('/greeted', function(req, res) {

  var name = req.body.name;
  var language = req.body.language


  greetings.greetPerson(name, language)

  var nameData = {
    nameGreeted: greetings.greeting(),
    nameCounter: greetings.greetCountNumber(),
    nameMap: greetings.map()
  }

  res.render('greetings', nameData);

});

app.get('/greeted/:name/:language', function(req, res) {

  var name = req.params.name;
  var language = req.params.language


  greetings.greetPerson(name, language)

  var nameData = {
    nameGreeted: greetings.greeting(),
    nameCounter: greetings.greetCountNumber(),
    nameMap: greetings.map()
  }

  res.render('greetings', nameData);

});

app.get('/counter', function(req, res){
  var nameData = {

    nameMap: greetings.map()
  }
  res.render('counter', nameData);

});

app.get('/counter/:name', function(req, res){

  var name = req.params.name
  var nameMap = greetings.map()
  var message = greetings.person(name)

res.render('counter',{nameMap,theMessage:message})
})

app.get('/reset', function(req,res){

  var nameData = {
    // nameGreeted: greetings.greeting(),
    // nameCounter: greetings.greetCountNumber(),
    nameMap: greetings.reset()
  }

res.redirect('/greeted')
});
