var express = require('express');
var router = express.Router();


router.route('/')
    .get(function(req, res){
        res.render('game.ejs');

    });

module.exports = router;
