import express from 'express';
import patientsServices from '../services/patientsServices';
import toNewPatient, { toNewEntry } from  '../utils';
const routerPatients = express.Router();

routerPatients.get('/', (_req, res) => {
    res.status(200).send(patientsServices.getNonSensisitivePatientsData());
});

routerPatients.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientsServices.addPatient(newPatient);
        res.status(201).send(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

routerPatients.get('/:id',(req,res) => {
    const {id} = req.params;
    const patient = patientsServices.getPatient(id);
    if(patient){
        res.status(200).send(patient);
    }else{
        res.status(400).end();
    }
});

routerPatients.post('/:id/entries',(req,res) => { 
    try {
        const {id} = req.params;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const entry = req.body;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newEntry = toNewEntry(entry);
        const addedEntry = patientsServices.addEntry(newEntry,id);
        if(addedEntry){
            res.status(201).send(addedEntry);
        }
        
    } catch (error:unknown) {
        if(error instanceof Error){
            res.status(400).send(error.message);
            return; 
        }
        res.status(404).send(error);
    }

});

export default routerPatients;