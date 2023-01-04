import patientsData from '../../data/patients';
import {Entry, NewEntry, NewPatient, /* NonSensisitivePatientsData, */ Patients, PublicPatient } from '../types';
import {v1 as uuid} from 'uuid';

const getPatients = ():Array<Patients> => {
    return patientsData;
};

const getNonSensisitivePatientsData = ():Array<PublicPatient> => {
    return patientsData.map(({id,name,dateOfBirth,gender,occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender, 
        occupation
    }));
};

const getPatient = (id:string):Patients|undefined => {
    const targetPatient: Patients | undefined = patientsData.find(patient => patient.id === id);
    console.log(patientsData);
    return targetPatient;
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

const addEntry = (entry:NewEntry,id:string):Entry => {
    const entryWithId = {
        ...entry,
        id:uuid()
    };
    patientsData.map(patient => patient.id === id ? patient.entries = [...patient.entries,entryWithId] : patient);
    return entryWithId; 
};

export default {
    getPatients,
    getNonSensisitivePatientsData,
    addPatient,
    getPatient,
    addEntry
};