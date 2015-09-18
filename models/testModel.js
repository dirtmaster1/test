var mongoose;
var Schema;
mongoose = require('mongoose');
Schema = mongoose.Schema;

var testModel = new Schema({
    _id : {type: Number},
    name: {type: String}
});

module.exports = mongoose.model('test', testModel);