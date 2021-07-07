var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: Number,
    firstname: String,
    lastname: String,
	sex: String,
	age: Number,
    password: String,
    repeat: String
});

module.exports = mongoose.model('Users', UserSchema);