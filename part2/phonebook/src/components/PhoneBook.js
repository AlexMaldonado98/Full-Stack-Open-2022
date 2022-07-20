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

export const Members = ({ persons }) => {

    return persons.map((person => <p key={person.name}>{person.name} / tel: {person.phone}</p>));

};

export const Filter = ({ handleFilter, filter, filterPersons }) => {
    return (
        <div>
            <input type={'text'} onChange={handleFilter} value={filter} />
            {filterPersons.map((person) => <p key={person.name}>{person.name}</p>)}
        </div>
    )
}