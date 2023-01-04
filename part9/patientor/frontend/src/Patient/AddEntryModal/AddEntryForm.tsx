import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, TextField } from "../../AddPatientModal/FormField";
import { DischargeFieldsForm, SelectField } from "./FormField";
import { useStateValue } from "../../state";
import { FieldsOnlyHospitalEntry, TypeEntry } from "../../types";
import { TypeOptions } from "./FormField";
import { Button, Grid } from "@material-ui/core";

interface Props {
    onSubmit: (values: FieldsOnlyHospitalEntry) => void;
    onCancel: () => void;
}

const typeOptions: TypeOptions[] = [
    { value: TypeEntry.HealthCheck, label: "Health check type" },
    { value: TypeEntry.Hospital, label: "Hospital-type" },
    { value: TypeEntry.OccupationalHealthCare, label: "Occupational Health Care type" },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnosis }] = useStateValue();

    return (
        <Formik
            initialValues={{
                date: '',
                specialist: '',
                description: '',
                diagnosisCodes: [],
                discharge: {
                    date: '',
                    criteria: ''
                },
                type: 'Hospital',
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                let errors:any = {};
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                if(!values.discharge.date){
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    errors = {...errors,discharge:{...errors?.discharge}}; 
                    errors.discharge.date = requiredError;
                }
                if(!values.discharge.criteria){
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    errors = {...errors,discharge:{...errors?.discharge}}; 
                    errors.discharge.criteria = requiredError;
                }
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return errors;
            }}
        >
            {({ isValid, dirty, values,setFieldValue, setFieldTouched}) => {
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
                        {values.type === 'Hospital' ? <DischargeFieldsForm /> : console.log('el type no es de tipo hospital')}
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