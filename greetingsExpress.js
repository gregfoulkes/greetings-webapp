module.exports = function(pool) {

  var greetNumber = 0;
  var nameMap = {}

  async function greetPerson(name, type) {

    if (name != '') {
      let result = await pool.query('select * from names where first_name = $1', [name])
      //console.log(result)
      if (result.rowCount === 0) {
        await pool.query('INSERT INTO names (first_name, greet_counter) values ($1, $2)', [name, 0]);
      }
      await pool.query('UPDATE names SET greet_counter = greet_counter+1 WHERE first_name = $1', [name]);

    }

    if (pool) {
      nameMap = pool
    }

    if (type === "english") {
      return 'Hello, ' + name
    }

    if (type === "afrikaans") {
      return 'More, ' + name
    }

    if (type === 'xhosa') {
      return 'Molo, ' + name
    }
  }

  async function greetCounterLength() {
    let result = await pool.query('SELECT * FROM names');
    return result.rowCount
  }

  async function listOfAllGreetedNames() {
    var result = await pool.query('SELECT * FROM names ')
    //  console.log(result)
    return result.rows
  }

  async function resetDataBase() {
    let results = await pool.query('delete from names')
    return results.rows
  }

  return {

    list: listOfAllGreetedNames,
    greetPerson: greetPerson,
    greetCountNumber: greetCounterLength,
    reset: resetDataBase
    //numberOfGreets: getNumberofGreets,
    // theMessage: returnMessage,
  }
}

// async function getNumberofGreets() {
//   let result = await pool.query('select greet_counter from names where first_name = $1', [name])
//   console.log(result)
//   return result.greet_counter
// }

// async function returnMessage(name) {
//   if (name != '') {
//     let user = await pool.query('SELECT * FROM names WHERE first_name = $1', [name]);
//     let greet_counter = 0;
//     if (user.rows.length > 0) {
//       greet_counter = user.rows[0].greet_counter;
//       let first_name = user.rows[0].first_name;
//       let message = 'Hello, ${first_name} has been greeted ${greet_counter} time(s)';
//       return message;
//     } else {
//       return 'Name not found'
//     }
//   }
// }
