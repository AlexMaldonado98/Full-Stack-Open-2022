import { useState } from "react"
import { get, post } from "../services/resource"

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }

    return {
        type,
        value,
        onChange,
        reset
    }
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    const getAll = async () => {
        const response = await get(baseUrl)
        setResources(response)
    };

    const create = async (resource) => {
        const response = await post(baseUrl, resource)
        setResources([...resources, response])
    }

    const service = {
        create,
        getAll
    }

    return [
        resources, service
    ]
}