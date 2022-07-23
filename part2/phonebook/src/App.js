import React, { useEffect, useState } from 'react'
import {Filter, NewPerson, Members} from './components/PhoneBook';
import {create, getAll, deletePerson, update} from './services/phoneBook'

const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [newName, setNewName] = useState('');
  const [newPhone, setPhone] = useState('');
  const [filter, setFilter] = useState('');
  const wantedPerson = filter === '' ? [] : persons.filter((person) => person.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) > -1);

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
    console.log({same})

    if (same) {
      if(same.number !== newPhone ){
        if(window.confirm(`${same.name} is already added to phonebook, replace the old number with a new one `)){
          const newObject = {...same, number: newPhone}
          update(same.id,newObject);
          setPersons(persons.map(person => person.id === same.id ? {...person, number: newPhone} : person));
        } 
      }else{
          alert(`${same.name} is already to phonebook`)
        }
    } else if (newName === '') {
      alert('You have to fill the name field')
    } else {
      const newPerson = {
        name: newName,
        number: newPhone
      }
      create(newPerson).then(response => {
        setPersons(persons.concat(response.data));
      });
      setNewName('');
      setPhone('');
    }
  }

  const handleFilter = (e) => {
    setFilter(e.target.value);
  }

  const removePerson = (id) => {
    const personTarget = persons.filter(person => person.id === id);

    if(window.confirm(`Delete ${personTarget[0].name}?`)){
      const newPersons = persons.filter(person => person.id !== id);
      deletePerson(id);
      setPersons(newPersons);
    }
  }

  useEffect(() => {
    getAll().then((response) => setPersons(response.data));
  },[]);
  
  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with</p>
      <Filter handleFilter={handleFilter} filterPersons={wantedPerson} value={filter} />
      <h2>add a new</h2>
      <NewPerson newName={newName} newPhone={newPhone} handleAdd={handleAdd} handleChange={handleChange} handlePhone={handlePhone} />
      <h2>Numbers</h2>
      <Members persons={persons} click={removePerson} />
    </div>
  )
}


export default App
