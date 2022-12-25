import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";
import { Patient } from "../types";
import BasicInfoPatient from "./BasicInfoPatient";
import DiagnosisInfo from "./DiagnosisInfo";

const PatientInfo = () => {
    console.log('ensamblando patieniNFO');
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    const patient = patients[id as string];

    React.useEffect(() => {
        const getPatient = async () => {
            try {
                if (id) {
                    const { data: targetPatient } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    dispatch(updatePatient(targetPatient));
                }
            } catch (e: unknown) {
                console.error(e);
            }
        };
        if (!patient?.ssn) {
            void getPatient();
        }

    }, [dispatch]);

    if (patient === undefined || patient.ssn === undefined) {
        return null;
    }

    return (
        <div>
            <BasicInfoPatient patient={patient} />
            {patient?.entries && <DiagnosisInfo entries={patient.entries} />}
        </div>
    );
};

export default PatientInfo;