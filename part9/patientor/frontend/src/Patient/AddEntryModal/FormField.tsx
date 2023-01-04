import { Container, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Field, FieldProps } from "formik";
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
    <Container >
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
    </Container>
);