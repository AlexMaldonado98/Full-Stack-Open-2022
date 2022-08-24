import axios from 'axios'

export const get = async (url) => {
    const response = await axios.get(url)
    return response.data
};

export const post = async (url,resource) => {
    const response = await axios.post(url, resource)
    return response.data
}