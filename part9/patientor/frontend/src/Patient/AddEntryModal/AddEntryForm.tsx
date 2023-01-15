import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, TextField } from "../../AddPatientModal/FormField";
import { DischargeFieldsForm, NumberField2, OccupationalFieldsForm, SelectField } from "./FormField";
import { useStateValue } from "../../state";
import { EntryForm, TypeEntry } from "../../types";
import { TypeOptions } from "./FormField";
import { Button, Grid } from "@material-ui/core";

export type EntryFormValues = Omit<EntryForm,'id'>;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const objHelper = {
    "HealthCheck": <Field
        label="healthCheckRating"
        component={NumberField2}
        min={0}
        max={3}
        name="healthCheckRating"
    />,
    "Hospital": <DischargeFieldsForm />,
    "OccupationalHealthcare": <OccupationalFieldsForm />
};

const typeOptions: TypeOptions[] = [
    { value: TypeEntry.HealthCheck, label: "Health check type" },
    { value: TypeEntry.Hospital, label: "Hospital-type" },
    { value: TypeEntry.OccupationalHealthCare, label: "Occupational Health Care type" },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnosis }] = useStateValue();
    console.log('render form');
    return (
        <Formik
            initialValues={{
                date: '',
                specialist: '',
                description: '',
                diagnosisCodes: [],
                healthCheckRating: 0,
                discharge: {
                    date: '',
                    criteria: ''
                },
                employerName: '',
                sickLeave: {
                    startDate: '',
                    endDate: '',
                },
                type: 'Hospital',
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                let errors: any = {};
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                //HealthCheck type validation
                if(values.healthCheckRating){
                    if(values.healthCheckRating > 3 || values.healthCheckRating < 0){
                        errors.healthCheckRating = "valid values are from 0 to 3";
                    }
                }
                //OccupationalHealthcare type validation
                if (!values.employerName && values.type === 'OccupationalHealthcare') {
                    errors.employerName = requiredError;
                }
                if(values.sickLeave){
                    if(values.sickLeave.startDate && !values.sickLeave.endDate){
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        errors = {...errors,sickLeave:{...errors.sickLeave}};
                        errors.sickLeave.endDate = requiredError;
                    }
                    if(values.sickLeave.endDate && !values.sickLeave.startDate){
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        errors = {...errors,sickLeave:{...errors.sickLeave}};
                        errors.sickLeave.startDate = requiredError;
                    }
                }
                //Hospital type validation
                if(values.discharge){
                    if (!values.discharge.date && values.type === 'Hospital') {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        errors = { ...errors, discharge: { ...errors?.discharge } };
                        errors.discharge.date = requiredError;
                    }
                    if (!values.discharge.criteria && values.type === 'Hospital') {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        errors = { ...errors, discharge: { ...errors?.discharge } };
                        errors.discharge.criteria = requiredError;
                    }
                }
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return errors;
            }}
        >
            {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Date"
                            placeholder="Date"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist Name"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name='description'
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnosis)}
                        />
                        <SelectField label="Type of entry" name="type" options={typeOptions} />
                        {Object.keys(objHelper).includes(values.type) && objHelper[values.type as keyof typeof objHelper]}
                        <Grid>
                            <Grid item>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{ float: "left" }}
                                    type="button"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{
                                        float: "right",
                                    }}
                                    type="submit"
                                    variant="contained"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;