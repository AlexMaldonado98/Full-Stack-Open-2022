import { Container, InputLabel, MenuItem, Select } from "@material-ui/core";
import { ErrorMessage, Field, FieldProps } from "formik";
import { TextField } from "../../AddPatientModal/FormField";
import { TypeEntry } from "../../types";

export interface TypeOptions {
    value: TypeEntry,
    label: string
}

type SelectFieldProps = {
    name: string;
    label: string;
    options: TypeOptions[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => <Select {...field} {...props} />;

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
    <>
        <InputLabel>{label}</InputLabel>
        <Field
            fullWidth
            style={{ marginBottom: "0.5em" }}
            label={label}
            component={FormikSelect}
            name={name}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label || option.value}
                </MenuItem>
            ))}
        </Field>
    </>
);

export const DischargeFieldsForm = () => (
    <div>
        <InputLabel >Discharge</InputLabel>
        <Field
            fullWidth
            style={{ marginBottom: "0.5em" }}
            label="Date"
            component={TextField}
            name="discharge.date"
        />
        <Field
            fullWidth
            style={{ marginBottom: "0.5em" }}
            label="Criteria"
            component={TextField}
            name="discharge.criteria"
        />
    </div>
);

export const OccupationalFieldsForm = () => (
    <Container >
        <Field
            fullWidth
            style={{ marginBottom: "0.5em" }}
            label="Employer name"
            component={TextField}
            name="employerName"
        />
        <Container >
            <InputLabel >Sick Leave</InputLabel>
            <Field
                fullWidth
                style={{ marginBottom: "0.5em" }}
                label="Start date"
                component={TextField}
                name="sickLeave.startDate"
            />
            <Field
                fullWidth
                style={{ marginBottom: "0.5em" }}
                label="End date"
                component={TextField}
                name="sickLeave.endDate"
            />
        </Container>
    </Container>
);

interface NumberProps extends FieldProps {
    label: string;
    errorMessage?: string;
    min: number;
    max: number;
}

export const NumberField2 = ({
    field,
    label,
    min,
    max,
}:NumberProps) => (
    <div style={{marginBottom:'1em'}}>
        <div>{label}</div>
        <Field {...field} type="number" min={min} max={max} />
        <div style={{ color: 'red' }}>
            <ErrorMessage name={field.name} />
        </div>
    </div>
);