var express = require('express'),
    mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/gameData', function (err) {
    if (err) {
        console.log(err);
    }
});

var GameData = require('./models/gameDataModel.js');

var app = express();

//establish port, uses process.env.Port settings since it is initialized in ./gulpfile.js
var port = process.env.PORT || 3000;

//set up route to game data
var router = express.Router();

router.route('/game')
    .get(function(req, res){

        //sanitize incoming request parameters
        var query = {};

        if(req.query.data)
        {
            query.data = req.query.data;
        }

        GameData.find(function(err,data){
            if(err) {
                res.status(500).send(err);
            }
            else {
                res.json(data);
            }
        });
    });

app.use('/api', router);

app.get('/', function(req, res){
    res.render('index.ejs');
});

app.listen(port, function(){
    console.log('Gulp is running at port: ' + port);
});


