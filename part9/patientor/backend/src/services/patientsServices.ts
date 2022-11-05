import { patientsData } from '../../data/patients';
import { NonSensisitivePatientsData, Patients } from '../types';

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

export default {
    getPatients,
    getNonSensisitivePatientsData
};