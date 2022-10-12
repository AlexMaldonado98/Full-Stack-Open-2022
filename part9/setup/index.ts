import express = require('express');

const app = express();

app.get('/',(_req,res) => {
    res.send('Home');
});

app.get('/hello',(_req,res) => {
    res.send('¡Hola Full Stack!');
});

const PORT = 3003;

app.listen(PORT,() => {
    console.log(`connecting to http://localhost:${PORT}`);
});