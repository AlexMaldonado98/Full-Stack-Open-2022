import axios from 'axios'

export const getCountry = async (name) => {
    const result = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
    return result.data
}

