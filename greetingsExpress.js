module.exports = function(storedUsers) {

  var greetNumber = 0;
  var thePerson = '';
  var languages = '';
  var nameMap = {}

  function greetMe(name, type) {
    //  console.log(storedUsers)

    if (name != '') {
      thePerson = name
      if (nameMap[thePerson] === undefined) {
        nameMap[thePerson] = 0;
      }
      nameMap[thePerson]++
    }

    if (storedUsers) {
      nameMap = storedUsers
    }

    if (type === "english") {
      languages = 'Hello, ' + thePerson
    }

    if (type === "afrikaans") {
      languages = 'More, ' + thePerson
    }

    if (type === 'xhosa') {
      languages = 'Molo, ' + thePerson
    }
  }

  function returnGreet() {
    return languages
  }

  function greetCounter(storedUsers) {
    return Object.keys(nameMap).length;
  }

  function greetMap(storedUsers) {
    return nameMap
  }

  function returnThePerson(name){
    if(name != ''){
      let nameValue = nameMap[name]
      return 'Hello, ' + name + ' has been greeted ' + nameValue + ' time(s)'
    }
    return 'No name found'
  }

  function resetMap() {
    return nameMap = {};
  }

  return {

    person: returnThePerson,
    greeting: returnGreet,
    map: greetMap,
    greetPerson: greetMe,
    greetCountNumber: greetCounter,
    reset: resetMap,

  }
}
