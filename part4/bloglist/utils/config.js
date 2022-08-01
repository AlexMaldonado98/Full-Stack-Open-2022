require('dotenv').config();

const MONBODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

module.exports = {
    MONBODB_URI,
    PORT
};