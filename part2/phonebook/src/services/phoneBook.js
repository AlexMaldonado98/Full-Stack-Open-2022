import axios from "axios";

const URL_API = 'http://localhost:3001/persons';

export const getAll = () => {
    return axios.get(URL_API);
};

export const create = newPerson => {
    return axios.post(URL_API,newPerson);
};