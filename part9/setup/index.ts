import express = require('express');
import {calculateBmi} from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

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

app.post('/exercises', (req,res) => {
    console.log(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {dailyHours,target} = req.body;
    if(!dailyHours || !target){ 
        res.status(400).send({error: 'parameters missing'});
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
    const validParameters: boolean = dailyHours.map((e:any) => {
        if(isNaN(Number(e))){
            return false;
        }
        return;
    }).includes(false) || isNaN(Number(target));
    if(validParameters) {
        res.status(400).send({error: 'malformatted parameters'});
        console.log(dailyHours);
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const returnObj:object = calculateExercises(dailyHours,target);
    res.status(200).send(returnObj).end();
});

const PORT = 3003;

app.listen(PORT,() => {
    console.log(`connecting to http://localhost:${PORT}`);
});