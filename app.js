// initialize web server (express) and ORM for MongoDB (mongoose)
var express = require('express'),
    mongoose = require('mongoose');
//establish connection with MongoDB
var db = mongoose.connect('mongodb://localhost/test', function (err) {
    if (err) {
        console.log(err);
    }
});

var app = express();
//set static assets folder location -  allows files to be served on client side
app.use(express.static(__dirname + '/public'));

//establish port, uses process.env.Port settings since it is initialized in ./gulpfile.js
var port = process.env.PORT || 3000;

//load and set up routes
var cards = require('./routes/cards.js');
var game = require('./routes/game.js');
var mandelbrot = require('./routes/mandelbrot.js');
var tbs = require('./routes/tbs.js');


app.use('/api/cards', cards);
app.use('/game', game);
app.use('/mandelbrot', mandelbrot);
app.use('/tbs', tbs);

app.get('/', function(req, res){
    res.render('index.ejs');
});

app.listen(port, function(){
    console.log('Gulp is running at port: ' + port);
});


