import { Typography } from "@material-ui/core";
import { Entry } from "../types";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";


type Props = {
    entries: Entry[]
};

const assingNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const DiagnosisInfo = ({ entries }: Props): JSX.Element | null => {

    if (entries.length === 0) {
        return null;
    }

    const entryDetails = (entry: Entry): JSX.Element | undefined => {
        switch (entry.type) {
            case 'HealthCheck':
                return <HealthCheck entry={entry} />;
            case 'Hospital':
                return <Hospital entry={entry} />;
            case 'OccupationalHealthcare':
                return <OccupationalHealthcare entry={entry} />;
            default:
                assingNever(entry);
        }
    };

    return (
        <>
            <Typography align="left" variant='h4' style={{ marginTop: '1em' }} >
                Entries
            </Typography>

            {entries.map(entry => entryDetails(entry))}
        </>
    );

};

export default DiagnosisInfo;