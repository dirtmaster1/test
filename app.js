var express = require('express');
var app = express();

var port = process.env.Port || 3000;

app.get('/', function(req, res){
    res.render('index.ejs');
});

app.listen(port, function(){
    console.log('Server running at port: ' + port);
});


