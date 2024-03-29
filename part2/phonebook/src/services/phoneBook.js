import axios from 'axios';
const URL_API = '/api/persons';

export const getAll = () => {
    const request = axios.get(URL_API);
    return request.then(response => response.data);
};

export const create = newPerson => {
    const request = axios.post(URL_API, newPerson);
    return request.then(response => response.data);
};

export const deletePerson = (id) => {
    const request = axios.delete(`${URL_API}/${id}`);
    return request.then(response => response.data);
};

export const update = (id, newObject) => {
    const request = axios.put(`${URL_API}/${id}`, newObject);
    return request.then(response => response.data);
};