import { Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import { Entry } from "../types";


type Props = {
    entries: Entry[]
};

const DiagnosisInfo = ({ entries }: Props): JSX.Element | null => {
    if(entries.length === 0){
        return null;
    }
    return (
        <>
            <Typography align="left" variant='h4' style={{ marginTop: '1em' }} >
                Entries
            </Typography>
            {entries.map(entry => (
                <Table key={entry.id}>
                    <TableBody >
                        <TableRow >
                            <TableCell>Date: {entry.date} Description: {entry.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <ul>
                                {entry.diagnosisCodes?.map(code => (
                                    <li key={code}>
                                        {code}
                                    </li>
                                ))}
                            </ul>
                        </TableRow>
                    </TableBody>
                </Table>
            ))}
        </>
    );

};

export default DiagnosisInfo;