import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient
  }
  | {
    type: "SET_DIAGNOSIS_LIST",
    payload: Diagnosis[]
  }
  | {
    type: "ADD_ENTRY",
    payload: {
      id: string,
      entry: Entry
    }
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      console.log(state);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      console.log(state);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce((acum, diagnose) => ({ ...acum, [diagnose.code]: diagnose }), {})
        }
      };
    case "ADD_ENTRY":
      const ID_TARGET_PATIENT = action.payload.id;
      return {
        ...state,
        patients: {
          ...state.patients,
          [ID_TARGET_PATIENT]: {
            ...state.patients[ID_TARGET_PATIENT],
            entries: state.patients[ID_TARGET_PATIENT]?.entries?.concat(action.payload.entry)
          }
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientsList: Array<Patient>): Action => {
  return {
    type: "SET_PATIENT_LIST", payload: patientsList
  };
};

export const addNewPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT", payload: patient
  };
};

export const updatePatient = (patientToUpdate: Patient): Action => {
  return {
    type: "UPDATE_PATIENT", payload: patientToUpdate
  };
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => {
  return { type: 'SET_DIAGNOSIS_LIST', payload: diagnosisList };
};

export const addNewEntry = (id: string, entry: Entry): Action => {
  return { type: "ADD_ENTRY", payload: { id, entry } };
};