const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    url: {
        type: String,
        required: true
    },
    likes:{
        type: Number,
        default:0
    },
    userOfBlog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: {
        type: Array,
        default: []
    }
});

blogSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id;
        delete returnObject._id;
        delete returnObject.__v;
    }
});

process.on('unCauthError',() => {
    mongoose.connection.close();
});

module.exports = mongoose.model('Blog', blogSchema);