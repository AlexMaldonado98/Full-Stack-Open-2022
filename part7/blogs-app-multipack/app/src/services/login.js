import axios from 'axios';
const loginUrl = '/api/login';

export const loginUser = async infoUser => {
    const { data } = await axios.post(loginUrl,infoUser);
    return data;
};