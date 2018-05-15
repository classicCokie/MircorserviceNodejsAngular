//Condition model
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ConditionSchema   = new Schema({
    easy_id : Number,
    title: String,
    description: String,

});

module.exports = mongoose.model('conditions', ConditionSchema);