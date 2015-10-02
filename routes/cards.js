var express = require('express');
var router = express.Router();
//load Mongoose Schema Modules
var Card  = require('../models/cardDataModel.js');

router.route('/')
    .get(function(req, res){

        //sanitize incoming request parameters
        var query = {};

        if(req.query.code)
        {
            query.code = req.query.code;
        }

        Card.find(query,{name:1,code:1},function(err,data){
            if(err) {
                res.status(500).send(err);
            }
            else {
                res.json(data);
            }
        });
    });

module.exports = router;
