import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';

let formatToken = null;

const setToken = (token) => {
    formatToken = `bearer ${token}`;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const create = async (newObject) => {
    const config= {
        headers: {Authorization: formatToken},
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

export default { getAll,setToken,create};