import axios from 'axios';

const baseUrl = '/api/users';

export const getAllUsers = async () => {
    const result = await axios.get(baseUrl);
    return result.data;
};