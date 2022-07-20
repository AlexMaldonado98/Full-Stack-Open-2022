import React, { useState } from 'react'

const Members = ({ persons }) => {

  return persons.map((person => <p key={person.name}>{person.name} / tel: {person.phone}</p>));

};


const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      phone: 9341321421
    }
  ])
  const [newName, setNewName] = useState('');
  const [newPhone, setPhone] = useState('');

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
    console.log(same);

    if (same) {
      alert(`${same.name} is already added to phonebook`);
    } else if (newName === ''){
      alert('You have to fill the name field')
    }else{
      setPersons(persons.concat({ name: newName, phone: newPhone }));
      setNewName('');
    }

  }


  return (
    <div>
      <h2>Phonebook</h2>
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
