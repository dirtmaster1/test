var express = require('express');
var app = express();

var port = process.env.Port || 3000;

var router = express.Router();

app.get('/', function(req, res){
    res.render('index.ejs');
});

app.listen(port, function(){
    console.log('Gulp running at port: ' + port);
});


