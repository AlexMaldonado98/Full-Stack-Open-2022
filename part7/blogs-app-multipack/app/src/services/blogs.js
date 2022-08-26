import axios from 'axios';
const baseUrl = '/api/blogs';

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
        headers: { Authorization: formatToken },
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const update = async (id,newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`,newObject);
    return response.data;
};

const deleteBlog = async (id) => {
    const config = {
        headers: { Authorization: formatToken }
    };
    const { data } = await axios.delete(`${baseUrl}/${id}`,config);
    return data;
};

export default { getAll,setToken,create,update,deleteBlog };