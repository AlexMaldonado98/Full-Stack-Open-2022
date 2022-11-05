export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}
export type NonSensisitivePatientsData = Omit<Patients,'ssn'>;

export interface Patients {
    id:string
    name:string
    dateOfBirth:string
    ssn:string
    gender:string
    occupation:string
}
