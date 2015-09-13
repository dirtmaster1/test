var mongoose  = require('mongoose'),
    Schema = mongoose.Schema;

var gameDataModel = new Schema({
    levelData: [],
    playerData: [],
    modelData: []
});

module.exports = mongoose.model('GameData', gameDataModel);