import { Table, TableBody, TableCell, TableRow /* Typography */ } from "@material-ui/core";
import { useStateValue } from "../state";
import { HospitalEntry } from "../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

type Props = {
    entry: HospitalEntry
};

const Hospital = ({ entry }: Props) => {
    const [{ diagnosis },] = useStateValue();

    return (
        <Table key={entry.id} style={{ border: 'solid 1px gray',marginBottom:'0.5em' }} >
            <TableBody >
                <TableRow >
                    <TableCell style={{ border: 'none'}}>
                        <div>{entry.date} <LocalHospitalIcon /></div>
                        <div>{entry.description}</div>
                        <div>
                            {
                                entry?.diagnosisCodes?.length !== 0 && (
                                    <ul>
                                        {entry.diagnosisCodes?.map((code,index) => (
                                            <li key={index}>
                                                {code} : {Object.values(diagnosis).find(diagnoseKey => diagnoseKey.code === code)?.name || "unknown"}
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

export default Hospital;