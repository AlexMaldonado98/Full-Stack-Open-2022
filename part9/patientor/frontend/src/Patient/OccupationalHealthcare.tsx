import { Table, TableBody, TableCell, TableRow /* Typography */ } from "@material-ui/core";
import { useStateValue } from "../state";
import {OccupationalHealthcareEntry } from "../types";
import WorkIcon from '@mui/icons-material/Work';

type Props = {
    entry: OccupationalHealthcareEntry
};

const OccupationalHealthcare = ({ entry }: Props) => {
    const [{ diagnosis },] = useStateValue();

    return (
        <Table key={entry.id} style={{ border: 'solid 1px gray',marginBottom:'0.5em' }}  >
            <TableBody >
                <TableRow >
                    <TableCell style={{ border: 'none'}}>
                        <div>{entry.date} <WorkIcon /></div>
                        <div>{entry.description}</div>
                        <div>
                            {
                                entry?.diagnosisCodes?.length !== 0 && (
                                    <ul>
                                        {entry.diagnosisCodes?.map(code => (
                                            <li key={code}>
                                                {code} : {Object.values(diagnosis).map(diagnoseKey => diagnoseKey.code === code && diagnoseKey.name)}
                                            </li>
                                        ))}
                                    </ul>
                                )
                            }
                        </div>
                        <div>Diagnose by: {entry.specialist}</div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default OccupationalHealthcare;