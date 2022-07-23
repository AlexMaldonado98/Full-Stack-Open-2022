import axios from "axios";

const URL_API = 'http://localhost:3001/persons';

export const getAll = () => {
    return axios.get(URL_API);
};

export const create = newPerson => {
    return axios.post(URL_API,newPerson);
};

export const deletePerson = (id) => {
    const request = axios.delete(`${URL_API}/${id}`)
    return request.then( response => response.data);
}