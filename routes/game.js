var express = require('express');
var router = express.Router();
//load Mongoose Schema Modules
var GameData = require('../models/gameDataModel.js');

router.route('/')
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

module.exports = router;
