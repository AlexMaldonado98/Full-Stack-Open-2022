export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}
export type NonSensisitivePatientsData = Omit<Patients,'ssn'>;

export type NewPatient = Omit<Patients,'id' | 'entries'>;

export enum Genders {
    Male = "male",
    Female = "female",
    Other = "other"
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry{
}

export interface Patients {
    id:string
    name:string
    dateOfBirth:string
    ssn:string
    gender:Genders
    occupation:string
    entries: Entry[]
}

export type PublicPatient = Omit<Patients,'ssn' | 'entries' >;


