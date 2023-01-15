import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { addNewEntry, updatePatient, useStateValue } from "../state";
import { Entry, Patient } from "../types";
import { EntryFormValues } from "./AddEntryModal/AddEntryForm";
import AddEntryModal from "./AddEntryModal/AddEntryModal";
import BasicInfoPatient from "./BasicInfoPatient";
import DiagnosisInfo from "./DiagnosisInfo";

const PatientInfo = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error,setError] = useState<string>();
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    const patient = patients[id as string];
    

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            if(!id){
                throw new Error('the id is missing');
            }
            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            console.log(newEntry);
            dispatch(addNewEntry(id,newEntry));
            closeModal();
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                setError(String(e?.response?.data) || "Unrecognized axios error");
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    };
    const closeModal = () => setModalOpen(false);

    const openModal = () => setModalOpen(true);

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
            <AddEntryModal error={error} onSubmit={submitNewEntry} onClose={closeModal} modalOpen={modalOpen} />
            <Button variant="outlined" onClick={() => openModal()}>
                Add New Entry
            </Button>
        </div>
    );
};

export default PatientInfo;