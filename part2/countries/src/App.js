import { useEffect, useState } from 'react';
import axios from 'axios';

const Filter = ({ countries, findCountrie }) => {

  const objCountrie = countries.filter((countrie) => countrie.name.toLocaleLowerCase().indexOf(findCountrie.toLocaleLowerCase()) > -1);

  if (objCountrie.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    );
  } else if (objCountrie.length <= 10 && objCountrie.length > 1) {
    return (
      objCountrie.map((countrieChild) => (
        <p key={countrieChild.name}>{countrieChild.name}</p>
      ))
    );
  } else if (objCountrie.length !== 0) {
    const countrie = objCountrie[0];
    return (
      <div>
        <h1>{countrie.name}</h1>
        <p>capital: {countrie.capital}</p>
        <p>population: {countrie.population}</p>
        <br/>
        <h2>languages</h2>
        <ul>
          {countrie.languages.map((language) => <li key={language.name}>{language.name}</li> )}
        </ul>
        <img alt='countrie-flag' src={countrie.flags.png}/>

      </div>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([]);
  const [findCountrie, setFindCountrie] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v2/all').then((respose) => {
      setCountries(respose.data)
    })
  }, []);

  const handleFind = (e) => {
    setFindCountrie(e.target.value);
  }

  return (
    <div>
      find countries:{String.fromCharCode('32')}
      <input type={'text'} onChange={handleFind} value={findCountrie} />
      {findCountrie === '' ? <p>write a filter</p> : <Filter countries={countries} findCountrie={findCountrie} />}
    </div>
  );
}

export default App;
