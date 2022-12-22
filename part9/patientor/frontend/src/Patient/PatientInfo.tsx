import { Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import { Male, Female, Transgender } from "@mui/icons-material";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";

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
                    dispatch({ type: "UPDATE_PATIENT", payload: targetPatient });
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

    const genderIcon = (gender: string) => {
        switch (gender.toLowerCase()) {
            case 'male':
                return <Male />;
            case 'female':
                return <Female />;
            default:
                return <Transgender />;
        }
    };

    return (
        <div>
            <Typography align="left" variant='h3' style={{marginTop:'2em'}} >
                {patient.name} {genderIcon(patient.gender)}
            </Typography>
            <Table>
                <TableBody >
                    <TableRow>
                        <TableCell>SSN: {patient.ssn}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>OCCUPATION: {patient.occupation}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default PatientInfo;