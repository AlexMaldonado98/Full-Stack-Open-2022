import express from 'express';
import patientsServices from '../services/patientsServices';
const routerPatients = express.Router();

routerPatients.get('/',(_req,res) => {
    res.status(200).send(patientsServices.getNonSensisitivePatientsData());
});

export default routerPatients;