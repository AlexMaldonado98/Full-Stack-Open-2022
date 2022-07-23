import axios from "axios";

const URL_API = 'http://localhost:3001/persons';

export const getAll = (setPersons) => {
    const request = axios.get(URL_API);
    return request.then((response) => setPersons(response.data))
};

export const create = newPerson => {
    return axios.post(URL_API,newPerson);
};

export const deletePerson = (id) => {
    const request = axios.delete(`${URL_API}/${id}`)
    return request.then( response => response.data);
}

export const update = (id,newObject) => {
    const request = axios.put(`${URL_API}/${id}`,newObject)
    return request.then(response => response.data)
}