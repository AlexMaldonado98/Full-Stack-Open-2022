const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        minlength: 4,
        require: true
    },
    favoriteGenre:{
        type:String
    }
});

module.exports = mongoose.model('User',schema);