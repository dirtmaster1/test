var express = require('express');
var router = express.Router();


router.route('/')
    .get(function(req, res){
        res.render('block_jumper.ejs');

    });

module.exports = router;