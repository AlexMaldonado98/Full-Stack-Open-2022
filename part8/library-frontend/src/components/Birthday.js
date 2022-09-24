import { useMutation } from "@apollo/client"
import { EDIT_AUTHOR } from "../authors/mutations.js";
import Select from "react-select";
import { useState } from "react";
import { ALL_AUTHORS } from '../authors/queries.js'

export const Birthday = ({ authors }) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [selectedOption, setSelectedOption] = useState(null);

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    })
    
    
    const options = authors !== [] && authors.map(author => ({ value: author.name, label: author.name }))

    const submit = (e) => {
        e.preventDefault()
        editAuthor({ variables: { name, born } })
        setName('')
        setBorn('')

    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit} >
                <Select
                    placeholder='Select an author'
                    onChange={({ value }) => setName(value)}
                    options={options}
                    isSearchable={false}
                />
                <div>
                    Born
                    <input type='number' value={born} onChange={({ target }) => setBorn(Number(target.value))} ></input>
                </div>
                <button>Update Author</button>
            </form>
        </div>
    );
};