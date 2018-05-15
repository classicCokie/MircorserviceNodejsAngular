//Condition model
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProfileSchema   = new Schema({
    easy_id : Number,
    first_name: String,
    last_name: String,
    short_description: String,
    description: String,
    website: String,
    profile_img: String,
    street: String,
    zip_code: Number,
    city: String,
    email: String,
    phone: Number,
    fax: Number,
    specialisation: String,
    education: String


});

module.exports = mongoose.model('profiles', ProfileSchema);