let assert = require("assert");

var postgres = require('pg')
const Pool = postgres.Pool

const pool = new Pool({
  connectionString: 'postgresql://coder:1234@localhost:5432/greetings'
})
const GreetFunction = require('../greetingsExpress')

describe('greetName function', function() {

  beforeEach(async function() {
    await pool.query("delete from names");
  });

  it('Should greet Andre in English and return Hello Andre', async function() {

    var callGreetFunction = GreetFunction(pool);
    let theMessage = await callGreetFunction.greetPerson('Andre', 'english');
    assert.equal('Hello, Andre', theMessage);

  });

  it('Should greet Ayabonga in Xhosa and return Molo Ayabonga', async function() {

    var callGreetFunction = GreetFunction(pool)
    let theMessage = await callGreetFunction.greetPerson('Ayabonga', 'xhosa');

    assert.equal(theMessage, 'Molo, Ayabonga')
  });

  it('Should greet Ross in Afrikaans and return More Ross', async function() {

    var callGreetFunction = GreetFunction(pool)
    let theMessage = await callGreetFunction.greetPerson('Ross', 'afrikaans');

    assert.equal(theMessage, 'More, Ross')
  });

  //
  // it('Should return a list of names', async function() {
  //
  //   var callGreetFunction = GreetFunction(pool);
  //   await callGreetFunction.greetPerson('Andre', 'english');
  //   await callGreetFunction.greetPerson('Ross', 'english');
  //
  //   let greetedPeople = await callGreetFunction.list();
  //   //console.log(greetedPeople);
  //   // let user = greetedPeople.find(function(user){ return user.first_name.trim() === 'Andre' });
  //   assert.deepEqual([ {id: 1,first_name: 'Andre', greet_counter: 1}, {id: 1,first_name: 'Ross', greet_counter: 1}], greetedPeople);
  //
  // });


  it('Should return a greet count of 1', async function() {

    var callGreetFunction = GreetFunction(pool)

    await callGreetFunction.greetPerson('Greg')
    await callGreetFunction.greetPerson('Greg')
    var theNumber = await callGreetFunction.greetCountNumber()

    assert.equal(theNumber, 1);
  });

  it('Should return a greet count of 2', async function() {

    var callGreetFunction = GreetFunction(pool)

    await callGreetFunction.greetPerson('Andre')
    await callGreetFunction.greetPerson('Greg')
    var theNumber = await callGreetFunction.greetCountNumber()

    assert.equal(theNumber, 2);
  });

  it('Should return a greet count of 3', async function() {

    var callGreetFunction = GreetFunction(pool)

    await callGreetFunction.greetPerson('Andre')
    await callGreetFunction.greetPerson('Greg')
    await callGreetFunction.greetPerson('Ayabonga')
    var theNumber = await callGreetFunction.greetCountNumber()
    //assert.equal(callGreetFunction.greetPerson('Andre','English'), 'Hello Andre')
    assert.equal(theNumber, 3);
  });



  it('Should return Greg greeted 2 times', async function() {

    var callGreetFunction = GreetFunction(pool)

    await callGreetFunction.greetPerson('Greg')
    await callGreetFunction.greetPerson('Greg')
    var theNumber = await callGreetFunction.numberOfGreets()

    assert.equal(theNumber, 2);
  });

  it('Should empty the database', async function() {

    var callGreetFunction = GreetFunction(pool)

    await callGreetFunction.greetPerson('Greg')
    await callGreetFunction.greetPerson('Greg')
    var empty = await callGreetFunction.reset()

    assert.deepEqual(empty, []);
  });

  after(async function() {
    await pool.end();
  });
});





//
//   it ('Should return map { Ross: 0, Luvuyo: 0, Aya: 0 }',function(){
//
//     var callGreetFunction = GreetFunction(pool)
//     callGreetFunction.greetPerson('Ross','afrikaans')
//     callGreetFunction.greetPerson('Luvuyo','xhosa')
//     callGreetFunction.greetPerson('Aya','english')
//
//     assert.deepEqual(callGreetFunction.map(), { Ross: 1, Luvuyo: 1, Aya: 1 })
//   });
// });
//
// describe('greetCounter Function', function(){
//   it('Should increment value at key when name greeted more than once', function(){
//     var callGreetings = GreetFunction(pool)
//     callGreetings.greetPerson('Ross','afrikaans')
//     callGreetings.greetPerson('Ross','afrikaans')
//
//   assert.deepEqual(callGreetings.map(),{Ross: 2} )
//   });
//
