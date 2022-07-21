import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'
import {Filter} from './components/Filter'

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
