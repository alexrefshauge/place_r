var fs = require('fs');

fs.readFile('../data/list.txt', (err, data) => {
    if (err) {
        console.log(err)
    }
    console.log(data.toString());


    fs.writeFile("../data/list.txt", data + "|", (err) => {
        console.log("written");
    });
});

