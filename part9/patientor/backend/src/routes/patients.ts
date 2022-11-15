/*eslint-disable @typescript-eslint/no-unsafe-assignment*/
import express from 'express';
import patientsServices from '../services/patientsServices';
const routerPatients = express.Router();

routerPatients.get('/', (_req, res) => {
    res.status(200).send(patientsServices.getNonSensisitivePatientsData());
});

routerPatients.post('/', (req, res) => {
    const { name, ssn, dateOfBirth, occupation, gender } = req.body;
    const newPatient = patientsServices.addPatient({
        name,
        ssn,
        dateOfBirth,
        occupation,
        gender,
    });
    console.log(newPatient);
    res.status(201).send(newPatient);
});
export default routerPatients;