var fs = require('fs');

fs.writeFile('./data/list.txt', "this is test" , (err) => {
    if (err) throw err;
  console.log('Replaced!');
});