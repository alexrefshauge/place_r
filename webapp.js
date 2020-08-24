const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { request, response } = require('express');
const { nextTick } = require('process');

//create app
var app = express();

//listen to port
app.listen(3000);
console.log("server runnig at http://localhost:3000/");

//static files
app.use(express.static('public'));
//body-parser for image upload
app.use(bodyParser.urlencoded({ extended: true }));

//pages
app.get('/', (request, response) => {
    console.log(request);
    response.sendFile('./public/index.html', { root: __dirname });
});

app.get('/about', (request, response) => {
    response.send('about');
});


//save image
app.post('/data/canvas.png', (request, response) => {
    console.log(request.body.image);
    recievedImage = request.body.image.replace("data:image/png;base64,", "").replace(" ", "+");
    buffer = Buffer.from(recievedImage, 'base64');
    //console.log("\n" + recievedImage.length, buffer.length + " " + buffer);

    //console.log(recievedImage);
    fs.writeFile('./public/data/canvas.png', buffer, (err, data) => {
        if (err) console.log(err);
        console.log("\nimage saved : " + data);
    });
    //fs.writeFile('./public/data/canvas.png', recievedImage, {encoding: 'base64'}, (err, data) => {
    //    if (err) console.log(err);
    //    console.log("image saved");
    //});
    response.send("success")
});

//404
app.use((request, response) => {
    response.send("error 404");
});

//fetch()

