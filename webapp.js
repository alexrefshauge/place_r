const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

//create app
var app = express();
var bigDots = [];
var newDots = [];

const maxDots = 100;

//listen to port
app.listen(3000);
console.log("server runnig at http://localhost:3000/");

//static files
app.use(express.static('public'));
//body-parser for image upload
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.redirect('/home');
})

app.get('/home', (req, res) => {
    res.sendFile('pages/home.html', { root: __dirname });
})

//pages
app.get('/canvas', (req, res) => {
    console.log(req);
    res.sendFile('pages/canvas.html', { root: __dirname });
});

app.get('/about', (req, res) => {
    res.send('pages/about.html');
});

//send initial dots
app.get('/data', (req, res) => {
    res.send(bigDots);
});

//send newest dots
app.get('/data/update', (req, res) => {
    while (newDots > maxDots) {
        newDots.shift();
    }
    res.send(newDots);
});

//save recieved dots
app.post('/data', (req, res) => {
    bigDots.push(req.body);
    newDots.push(req.body);
    //console.log(dots);
    res.json(req.body);
});

//404
app.use((req, res) => {
    res.send("error 404");
});

//fetch()

