import { Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import { useStateValue } from "../state";
import { Entry } from "../types";


type Props = {
    entries: Entry[]
};

const DiagnosisInfo = ({ entries }: Props): JSX.Element | null => {
    if (entries.length === 0) {
        return null;
    }

    const [{ diagnosis },] = useStateValue();

    return (
        <>
            <Typography align="left" variant='h4' style={{ marginTop: '1em' }} >
                Entries
            </Typography>
            {entries.map(entry => (
                <Table key={entry.id}>
                    <TableBody >
                        <TableRow >
                            <TableCell>
                                <div>
                                    Date: {entry.date} Description: {entry.description}
                                </div>
                                <div>
                                    <ul>
                                        {entry.diagnosisCodes?.map(code => (
                                            <li key={code}>
                                                {code} : {Object.values(diagnosis).map(diagnoseKey => diagnoseKey.code === code && diagnoseKey.name)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            ))}
        </>
    );

};

export default DiagnosisInfo;