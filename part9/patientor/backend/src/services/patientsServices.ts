import { patientsData } from '../../data/patients';
import { NewPatient, NonSensisitivePatientsData, Patients } from '../types';
import {v1 as uuid} from 'uuid';

const getPatients = ():Array<Patients> => {
    return patientsData;
};

const getNonSensisitivePatientsData = ():Array<NonSensisitivePatientsData> => {
    return patientsData.map(({id,name,dateOfBirth,gender,occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient:NewPatient):Patients => {
    const newPatient = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        id: uuid(),
        ...patient
    };
    patientsData.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getNonSensisitivePatientsData,
    addPatient
};