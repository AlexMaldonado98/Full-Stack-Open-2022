const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:String,
    name: String,
    passwordHash: String,
    blogsOfUser:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
});

userSchema.set('toJSON',{
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id;

        delete returnObject._id;
        delete returnObject.__v;
        delete returnObject.passwordHash;
    }
});


module.exports = new mongoose.model('User',userSchema);