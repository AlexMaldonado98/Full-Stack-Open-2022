import { useState, useEffect } from 'react'
import { getCountry } from '../services/country'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    
    useEffect(() => {
        if(name){
            getCountry(name).then(response => setCountry(response[0])).catch(() => setCountry(null));
        }
    }, [name])

    return country
}