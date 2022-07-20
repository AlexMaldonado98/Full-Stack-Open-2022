import React, { useState } from 'react'

const Members = ({ persons }) => {

  return persons.map((person => <p key={person.name}>{person.name} / tel: {person.phone}</p>));

};

const Filter = ({ handleFilter, filter, filterPersons }) => {
  return (
    <div>
      <input type={'text'} onChange={handleFilter} value={filter} />
      {filterPersons.map((person) => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('');
  const [newPhone, setPhone] = useState('');
  const [filter, setFilter] = useState('');

  const handleChange = (e) => {
    setNewName(e.target.value);
  }

  const handlePhone = (e) => {
    setPhone(e.target.value);
  }

  const handleAdd = (e) => {
    e.preventDefault();
    const same = persons.find((person) => {
      return person.name === newName
    });

    if (same) {
      alert(`${same.name} is already added to phonebook`);
    } else if (newName === '') {
      alert('You have to fill the name field')
    } else {
      setPersons(persons.concat({ name: newName, phone: newPhone }));
      setNewName('');
      setPhone('');
    }

  }

  const handleFilter = (e) => {
    setFilter(e.target.value);
  }

  const wantedPerson = filter === '' ? [] : persons.filter((person) => person.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) > -1);


  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with</p>
      <Filter handleFilter={handleFilter} filterPersons={wantedPerson} value={filter} />
      <h2>add a new</h2>
      <form onSubmit={handleAdd}>
        <div>
          name : <input type={'text'} onChange={handleChange} value={newName} /> <br></br>
          phone: <input type={'number'} onChange={handlePhone} value={newPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Members persons={persons} />
    </div>
  )
}

export default App
