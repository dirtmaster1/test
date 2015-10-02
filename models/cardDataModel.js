var mongoose;
var Schema;
mongoose = require('mongoose');
Schema = mongoose.Schema;

var cardModel = new Schema({
    _id : {type: Number},
    code: {type: String},
    name: {type: String}
});

module.exports = mongoose.model('Card', cardModel, 'CardArrayData');