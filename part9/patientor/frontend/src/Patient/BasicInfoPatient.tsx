import { Male, Female, Transgender } from "@mui/icons-material";
import { Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import { Patient } from "../types";

type Props = {
    patient: Patient
};
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

const BasicInfoPatient = ({ patient }: Props) => {
    return (
        <>
            <Typography align="left" variant='h3' style={{ marginTop: '2em' }} >
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
        </>
    );
};

export default BasicInfoPatient;