import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";

import { apiBaseUrl } from "./constants";
import { setDiagnosisList, setPatientList, useStateValue } from "./state";
import { Diagnosis, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import { Typography } from "@material-ui/core";
import PatientInfo from "./Patient";

const App = () => {
  const [{patients}, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        const {data: diagnosisListFromApi} = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        dispatch(setPatientList(patientListFromApi));
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            {/*Prevents the Alex component from rendering more than twice when the page is reloaded within the Alex component*/}
            {Object.values(patients).length !== 0 && <Route path="/patients/:id" element={<PatientInfo />}/>}
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
