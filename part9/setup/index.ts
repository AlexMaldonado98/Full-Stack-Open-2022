import express = require('express');
import {calculateBmi} from './bmiCalculator';

const app = express();

app.get('/',(_req,res) => {
    res.send('Home');
});

app.get('/hello',(_req,res) => {
    res.send('¡Hola Full Stack!');
});

app.get('/bmi',(req,res) => {
    const {height,weight} = req.query;
    const validParameters: boolean =
    !isNaN(Number(height)) && !isNaN(Number(weight));
    if(validParameters){
        const bmi = calculateBmi(Number(height),Number(weight));
        res.status(200).send({height,weight,bmi});
    }
    res.status(404).send({error:'Bad params'});
});

const PORT = 3003;

app.listen(PORT,() => {
    console.log(`connecting to http://localhost:${PORT}`);
});