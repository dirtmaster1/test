var express = require('express'),
    mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/gameData');

var app = express();

//establish port, uses process.env.Port settings since it is initialized in ./gulpfile.js
var port = process.env.Port || 3000;

//set up route to game data
var router = express.Router();

router.route('/game')
    .get(function(req, res){
        var responseJson = {gameData: "data"};
        res.json(responseJson);
    });

app.use('/api', router);

app.get('/', function(req, res){
    res.render('index.ejs');
});

app.listen(port, function(){
    console.log('Gulp is running at port: ' + port);
});


