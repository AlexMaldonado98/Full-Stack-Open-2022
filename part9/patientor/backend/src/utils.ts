import { Genders, NewPatient } from "./types";

type Fields = { name: unknown, ssn: unknown, occupation: unknown, gender: unknown,dateOfBirth:unknown };

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseEntry = (value: unknown): string => {
    if (!value || !isString(value)) {
        throw new Error(`incorrect or is missing value`);
    }
    return value;
};

const isDate = (date:string):boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date:unknown):string => {
    if(!date || !isString(date) || !isDate(date)){
        throw new Error('the date is bad format or is missing');
    }
    return date; 
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGenders = (gender:any):gender is Genders => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Genders).includes(gender);
};

const parseGender = (gender:unknown):Genders => {
    if(!gender || !isString(gender) || !isGenders(gender)){
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

const toNewPatient = ({ name, ssn, occupation, gender,dateOfBirth }:Fields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseEntry(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseEntry(ssn),
        occupation: parseEntry(occupation),
        gender: parseGender(gender)
    };
    return newPatient;
};

export default toNewPatient;