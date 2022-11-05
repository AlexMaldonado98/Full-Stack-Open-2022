import express from 'express';
import diagnoseServices from '../services/diagnoseServices';
const routeDiagnose = express.Router();

routeDiagnose.get('/',(_req,res) => {
    res.status(200).send(diagnoseServices.getDiagnose());
});

export default routeDiagnose;