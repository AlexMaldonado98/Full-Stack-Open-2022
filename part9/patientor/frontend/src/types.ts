export enum HealthCheckRating{
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum TypeEntry {
  "Hospital" = "Hospital",
  HealthCheck = "HealthCheck",
  OccupationalHealthCare = "OccupationalHealthcare"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

//the name on backend is Diagnose //
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string
  date: string
  specialist:string
  description: string
  diagnosisCodes?: Array<Diagnosis['code']>
}

export interface HealthCheckEntry extends BaseEntry{
  type: "HealthCheck"
  healthCheckRating: HealthCheckRating
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital"
  discharge: {
      date: string
      criteria: string
  }
}

export interface OccupationalHealthcareEntry extends BaseEntry{
  type: "OccupationalHealthcare"
  employerName: string
  sickLeave?:{
      startDate: string
      endDate: string
  }
}

export type Entry = | HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;

type UnionOmit<T,k extends string | number | symbol > = T extends unknown ? Omit<T,k> : never; 

export type FieldsEntries = UnionOmit<Entry,'id'>;
export type FieldsOnlyHospitalEntry = Omit<HospitalEntry,'id'>;