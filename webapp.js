const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { request, response } = require('express');
const { nextTick } = require('process');

//create app
var app = express();
var dots = [];

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

//send initial dots
app.get('/data', (request, response) => {;
    console.log(dots[dots.length-1]);
    response.send(dots);
});

//save recieved dots
app.post('/data', (request, response) => {
    dots.push(request.body);
    console.log(dots);
    response.json(dots);
});

//404
app.use((request, response) => {
    response.send("error 404");
});

//fetch()

