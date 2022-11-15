export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}
export type NonSensisitivePatientsData = Omit<Patients,'ssn'>;

export type NewPatient = Omit<Patients,'id'>;

export enum Genders {
    Male = "male",
    Female = "female",
    Other = "other"
}

export interface Patients {
    id:string
    name:string
    dateOfBirth:string
    ssn:string
    gender:Genders
    occupation:string
}


