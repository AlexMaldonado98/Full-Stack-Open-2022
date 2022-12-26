import { HealthCheckEntry } from "../types";
import { Table, TableBody, TableRow, TableCell } from "@mui/material";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useStateValue } from "../state";

type Props = {
    entry: HealthCheckEntry
};

const colorHeartIcon = (rating:number):JSX.Element => {
    switch(rating){
        case 0: return <FavoriteIcon color="success" />;
        case 1: return <FavoriteIcon style={{color:'yellow'}}/>;
        case 2: return <FavoriteIcon style={{color:'orange'}} />;
        default: return <FavoriteIcon color="error" />;
    }
};

const HealthCheck = ({ entry }: Props) => {
    const [{ diagnosis },] = useStateValue();

    return (
        <Table key={entry.id} style={{ border: 'solid 1px gray',marginBottom:'0.5em' }} >
            <TableBody >
                <TableRow >
                    <TableCell style={{ border: 'none'}}>
                        <div>{entry.date} <MedicalInformationIcon /></div>
                        <div>{entry.description}</div>
                        <div>{colorHeartIcon(entry.healthCheckRating)}</div>
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

export default HealthCheck;