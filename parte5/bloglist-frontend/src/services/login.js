import axios from 'axios';
const loginUrl = 'http://localhost:3006/api/login';

export const loginUser = async infoUser => {
    const {data} = await axios.post(loginUrl,infoUser);
    return data;
};
