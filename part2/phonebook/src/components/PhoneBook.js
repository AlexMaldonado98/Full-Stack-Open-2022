export const NewPerson = ({ newName, newPhone, handleAdd, handleChange, handlePhone }) => (
    <form onSubmit={handleAdd}>
        <div>
            name : <input type={'text'} onChange={handleChange} value={newName} /> <br></br>
            phone: <input type={'number'} onChange={handlePhone} value={newPhone} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
);

export const Members = ({ persons, click }) => {

    return persons.map(person => (
        <div key={person.name}>
            <span>{person.name} / tel: {person.number} / </span>
            <button onClick={() => click(person.id)}>delete</button>
        </div>
    ))

};

export const Filter = ({ handleFilter, filter, filterPersons }) => {
    return (
        <div>
            <input type={'text'} onChange={handleFilter} value={filter} />
            {filterPersons.map((person) => <p key={person.name}> {`${person.name} / ${person.number}`}</p>)}
        </div>
    )
}

export const Message = ({ message }) => {
    if (message === null) {
        return null
    }

    if (message.includes('ERROR')){
        return <p className="messageError" >{message}</p>
    }else {
        return <p className="message">{message}</p>
    };
}