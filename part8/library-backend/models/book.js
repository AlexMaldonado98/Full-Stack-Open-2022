const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    title:{
        type: String,
        require:true,
        unique: true,
        minlength: 2
    },
    published:{
        type: Number
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    genres: [
        {type: String}
    ]
});


module.exports = mongoose.model('Book', schema);