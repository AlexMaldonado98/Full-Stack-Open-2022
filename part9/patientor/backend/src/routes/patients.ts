import express from 'express';
import patientsServices from '../services/patientsServices';
import toNewPatient from  '../utils';
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
export default routerPatients;