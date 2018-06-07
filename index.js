var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
const Greet = require('./greetingsExpress')

//postgres
var postgres = require('pg')
const Pool = postgres.Pool


let useSSL = false;
if(process.env.DATABASE_URL){
  useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:1234@localhost:5432/greetings'

const pool = new Pool({
  connectionString,
  ssl:useSSL
})

const greetings = Greet(pool)


//start the server
var server = app.listen(4008);

app.use(express.static('public'));

let PORT = process.env.PORT || 4000;

app.listen(PORT, function() {
  console.log('App starting on port', PORT);
});

//middleware
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json())

//handlebars setup
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers:{
    'message': function(){
      if(this.greet_counter == 1){
        return 'Hello, ' + this.first_name + ' has been greeted once'
      }else{
        return 'Hello, ' + this.first_name + ' has been greeted ' + this.greet_counter + ' times';
      }
    }
  }

}));

app.set('view engine', 'handlebars');

app.get('/', async function(req, res) {
  res.render('greetings',  {nameCounter: await greetings.greetCountNumber()});
});

app.post('/greeted', async function(req, res, next) {

try{
  var nameData = {
    nameGreeted: await greetings.greetPerson(req.body.name, req.body.language),
    nameCounter: await greetings.greetCountNumber(),
  }
  res.render('greetings', nameData);
}
  catch (err) {
    return next(err)
  }
});

app.get('/counter', async function(req, res, next) {

  try {
    let nameList = await greetings.list()
    // let message = await greetings.theMessage(nameList)
   //console.log(nameList)
    res.render('counter', {nameList});
} catch (err) {
    return next(err)
  }

});

app.get('/counter:name', async function(req, res, next) {
  try {
   let name = req.params.name
    let theMessage = await greetings.greetedUser(name)
    res.render('counter', {theMessage});
} catch (err) {
    return next(err)
  }
  console.log(theMessage)
   res.render('counter', { nameList});

});

app.get('/reset', async function(req, res, next) {
  try{
   await greetings.reset()
   console.log(   await greetings.reset()
)
    res.redirect('/')
  }catch(err){
    return next(err)
  }

});
//
// app.get('/counter:name', async function(req, res) {
//
//   try{
//     console.log('...');
//     let nameList = await greetings.list();
//     console.log(users);
//
//     res.render('counter', {nameList})
//
//   }catch(err){
//     return next(err)
//   }
//
// })


// app.get('/greeted', async function(req, res){
//
//   try{
//     let names = await query.pool('select * from users');
//     let greetedNames = await names.rows
//     res.render('greetings', {greetedNames})
//   } catch (err) {
//       return next(err)
//     }
// });

// app.get('/greeted/:name', function(req, res) {
//
//   // var name = req.params.name;
//   // var language = req.params.language
//   //
//   // var nameData = {
//   //   nameGreeted: greetings.greetPerson(name, language),
//   //
//   //   nameCounter: greetings.greetCountNumber(),
//   //   nameMap: greetings.map()
//   // }
//
//   res.render('greetings', nameData);
//
//   console.log('...');
//   let users = await greetings.list();
//   console.log(users);
//
//   res.render('counter', {
//      nameList : users
//   })
//
// });
