import { Diagnose, Entry, Genders, HealthCheckRating, NewEntry, NewPatient } from "./types";

type Fields = { name: unknown, ssn: unknown, occupation: unknown, gender: unknown, dateOfBirth: unknown, entries: Entry[] };

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseEntry = (value: unknown): string => {
    if (!value || !isString(value)) {
        throw new Error(`incorrect or is missing value`);
    }
    return value;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('the date is bad format or is missing');
    }
    return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGenders = (gender: any): gender is Genders => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Genders).includes(gender);
};

const parseGender = (gender: unknown): Genders => {
    if (!gender || !isString(gender) || !isGenders(gender)) {
        throw new Error('Incorrect or is missing gender');
    }
    return gender;
};

const parseEntries = (entries: Entry[] | undefined): Entry[] | undefined => {
    if (entries === undefined) {
        return undefined;
    } else {
        const entriesOutput = entries.length === 0 ? undefined : entries.map((entry) => {
            if (!entry.id || !isString(entry.id)) {
                throw new Error('Incorrect or is missing Id');
            }
            if (!entry.date || !isString(entry.date) || !isDate(entry.date)) {
                throw new Error('Incorrect or is missing date');
            }
            if (!entry.specialist || !isString(entry.specialist)) {
                throw new Error('Incorrect or is missing specialist');
            }
            if (!entry.description || !isString(entry.description)) {
                throw new Error('Incorrect or is missing description');
            }
            if (entry.diagnosisCodes) {
                entry.diagnosisCodes.length !== 0 && entry.diagnosisCodes.map(code => {
                    if (!isString(code)) {
                        throw new Error('Incorrect or is missing code');
                    }
                });
            }
            if (!entry.type || !isString(entry.type)) {
                throw new Error('Incorrect or is misisng type');
            }

            switch (entry.type) {
                case "HealthCheck":
                    if (entry.healthCheckRating === undefined || typeof entry.healthCheckRating !== 'number') {
                        throw new Error('Incorrect or is missing HealthCheckRating');
                    }
                    break;
                case 'Hospital':
                    if (!entry.discharge || Object.values(entry.discharge).length === 0) {
                        throw new Error('Incorrect or is missing discharge');
                    } else if (!entry.discharge.date || !isString(entry.discharge.date) || !isDate(entry.discharge.date)) {
                        throw new Error('Incorrect or is missing "date" on discharge');
                    } else if (!entry.discharge.criteria || !isString(entry.discharge.criteria)) {
                        throw new Error('Incorrect or is missing "critetia" on discharge');
                    }
                    break;
                case 'OccupationalHealthcare':
                    if (!entry.employerName || !isString(entry.employerName)) {
                        throw new Error('Incorrect or is missing employerName');
                    } else if (entry.sickLeave) {
                        if (Object.keys(entry.sickLeave).length === 0) {
                            throw new Error('Incorrect or is missing sickLeave');
                        } else if (!entry.sickLeave.startDate || !isDate(entry.sickLeave.startDate)) {
                            throw new Error('Incorrect or is missing "startDate" on sickLeave');
                        } else if (!entry.sickLeave.endDate || !isDate(entry.sickLeave.endDate)) {
                            throw new Error('Incorrect or is missing "endDate" on sickLeave');
                        }
                    }
                    break;
                default:
                    break;

            }
            return entry;
        });
        return entriesOutput;
    }

};

const parseCode = (code:unknown[] | undefined):Array<Diagnose['code']> | null => {
    if(code === undefined){
        return null;
    }
    code.map(c => {
        if(!c || !isString(c)){
            throw new Error('Incorrect or is missing code');
        }
    });
    return code as Array<Diagnose['code']>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (ratingEntry:any):ratingEntry is HealthCheckRating=> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(ratingEntry);
};

const parseHealthCheckRating = (rating:unknown):HealthCheckRating => {
    if(rating === undefined || !isHealthCheckRating(rating)){
        throw new Error('Incorrect or is missing healthCheckRating');
    }
    return rating;
};

/* type FieldEntry = {
    id
} */
type EntryField ={
    date: unknown,
    specialist: unknown,
    description:unknown,
    diagnosisCodes?:unknown[],
    type:unknown,
    healthCheckRating:unknown,
    discharge:{
        date:unknown,
        criteria:unknown,
    }
    employerName:unknown,
    sickLeave?:{
        startDate:unknown,
        endDate:unknown
    }
};

//it verify that the valueExist parameter exits to return value parameter
const bothOrNothing = (value:unknown,valueExist:unknown) => {
    if((!value && valueExist) || (value && !valueExist)){
        throw new Error('there must be start date and end date or no date');
    }else if(!value && !valueExist){
        return '';
    }else if(value && valueExist){
        parseDateOfBirth(valueExist);
        return parseDateOfBirth(value);
    }else{
        throw new Error('I don\'t know what happened');
    }
};

export const toNewEntry = (entry:EntryField): NewEntry => {

    const newEntry = {
        date: parseDateOfBirth(entry.date),
        specialist: parseEntry(entry.specialist),
        description: parseEntry(entry.description),
        type: parseEntry(entry.type),
        diagnosisCodes: parseCode(entry.diagnosisCodes) || []
    };

    switch(entry.type){
        case 'HealthCheck':
            const entryHealthCheck:NewEntry = {
                ...newEntry,
                healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
                type:'HealthCheck',
            };
            return entryHealthCheck;
        case 'Hospital':
            const entryHospital:NewEntry = {
                ...newEntry,
                discharge:{
                    date: parseDateOfBirth(entry.discharge.date),
                    criteria: parseEntry(entry.discharge.criteria)
                },
                type:'Hospital'
            };
            return entryHospital;
        case 'OccupationalHealthcare':
            const entryOccupationalHealthcare:NewEntry = {
                ...newEntry,
                employerName: parseEntry(entry.employerName),
                sickLeave:{
                    startDate: bothOrNothing(entry.sickLeave?.startDate,entry.sickLeave?.endDate),
                    endDate: bothOrNothing(entry.sickLeave?.endDate,entry.sickLeave?.startDate)
                },
                type: 'OccupationalHealthcare'
            };
            return entryOccupationalHealthcare;
        default: throw new Error('uncontrolled type');
    }
};



const toNewPatient = ({ name, ssn, occupation, gender, dateOfBirth, entries }: Fields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseEntry(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseEntry(ssn),
        occupation: parseEntry(occupation),
        gender: parseGender(gender),
        entries: parseEntries(entries) || []
    };
    return newPatient;
};

export default toNewPatient;