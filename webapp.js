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
    recievedImage = request.body.image.split(';base64,').pop();

    console.log(recievedImage);
    fs.writeFile('./public/data/canvas.png', recievedImage, 'base64', (err, data) => {
        if (err) console.log(err);
        console.log("image saved");
    });
    response.send("success")
});

//404
app.use((request, response) => {
    response.send("error 404");
});

//fetch()

