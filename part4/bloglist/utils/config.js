require('dotenv').config();

let MONGODB_URI = process.env.MONGODB_URI;
let PORT = process.env.PORT;
const SECRET = process.env.SECRET;

if(process.env.NODE_ENV === 'test'){
    MONGODB_URI = process.env.TEST_MONGODB_URI;
    PORT = process.env.TEST_PORT;
}

module.exports = {
    MONGODB_URI,
    PORT,
    SECRET
};