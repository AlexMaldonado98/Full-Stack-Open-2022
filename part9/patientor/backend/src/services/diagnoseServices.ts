import {diagnoseData} from "../../data/diagnoses";
import { Diagnose } from "../types";

const getDiagnose = (): Array<Diagnose> => {
    return diagnoseData;
};

export default { getDiagnose };