export enum Genders {
    Male = "male",
    Female = "female",
    Other = "other"
}

export enum HealthCheckRating{
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface Patients {
    id:string
    name:string
    dateOfBirth:string
    ssn:string
    gender:Genders
    occupation:string
    entries: Entry[] | []
}
export type NonSensisitivePatientsData = Omit<Patients,'ssn'>;

export type NewPatient = Omit<Patients,'id'>;

export type PublicPatient = Omit<Patients,'ssn' | 'entries' >;

export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

interface BaseEntry {
    id: string
    date: string
    specialist:string
    description: string
    diagnosisCodes?: Array<Diagnose['code']>
}

interface HealthCheckEntry extends BaseEntry{
    type: "HealthCheck"
    healthCheckRating: HealthCheckRating
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital"
    discharge: {
        date: string
        criteria: string
    }
}

interface OccupationalHealthcareEntry extends BaseEntry{
    type: "OccupationalHealthcare"
    employerName: string
    sickLeave?:{
        startDate: string
        endDate: string
    }
}

export type Entry = | HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;
// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type NewEntry = UnionOmit<Entry, "id">;





