let assert = require("assert");
const GreetFunction = require('../greetingsExpress')


describe ('greetCounter Function', function(){
  it ('Should return a greet count of 1',function(){

    var callGreetFunction = GreetFunction()

    callGreetFunction.greetPerson('Greg')
    callGreetFunction.greetPerson('Greg')

    assert.equal(callGreetFunction.greetCountNumber(),1);
  });

  it ('Should return a greet count of 2',function(){

    var callGreetFunction = GreetFunction()

    callGreetFunction.greetPerson('Andre')
    callGreetFunction.greetPerson('Greg')

    assert.equal(callGreetFunction.greetCountNumber(),2);
  });

  it ('Should return a greet count of 3',function(){

    var callGreetFunction = GreetFunction()

    callGreetFunction.greetPerson('Andre')
    callGreetFunction.greetPerson('Greg')
    callGreetFunction.greetPerson('Ayabonga')

    //assert.equal(callGreetFunction.greetPerson('Andre','English'), 'Hello Andre')
    assert.equal(callGreetFunction.greetCountNumber(),3);
  });

  it ('Should greet Andre in English and return Hello Andre',function(){

    var callGreetFunction = GreetFunction()
    callGreetFunction.greetPerson('Andre','english')
    assert.equal(callGreetFunction.greeting(), 'Hello, Andre')
  });

  it ('Should greet Ayabonga in Xhosa and return Molo Ayabonga',function(){

    var callGreetFunction = GreetFunction()

    callGreetFunction.greetPerson('Ayabonga','xhosa')

    assert.equal(callGreetFunction.greeting(), 'Molo, Ayabonga')
  });

  it ('Should greet Ross in Afrikaans and return More Ross',function(){

    var callGreetFunction = GreetFunction()
    callGreetFunction.greetPerson('Ross','afrikaans')

    assert.equal(callGreetFunction.greeting(), 'More, Ross')
  });

  it ('Should return map { Ross: 0, Luvuyo: 0, Aya: 0 }',function(){

    var callGreetFunction = GreetFunction()
    callGreetFunction.greetPerson('Ross','afrikaans')
    callGreetFunction.greetPerson('Luvuyo','xhosa')
    callGreetFunction.greetPerson('Aya','english')

    assert.deepEqual(callGreetFunction.map(), { Ross: 1, Luvuyo: 1, Aya: 1 })
  });
});

describe('greetCounter Function', function(){
  it('Should increment value at key when name greeted more than once', function(){
    var callGreetings = GreetFunction()
    callGreetings.greetPerson('Ross','afrikaans')
    callGreetings.greetPerson('Ross','afrikaans')

  assert.deepEqual(callGreetings.map(),{Ross: 2} )
  });
});
