import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_BOOKS } from "../graphql/queries";

const Books = (props) => {

  const { data, loading } = useQuery(ALL_BOOKS);
  const [allbooksT, result] = useLazyQuery(ALL_BOOKS);
  const [books,setBooks] = useState([]);
  const [p,setP] = useState('all genres');
  

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks);
    }
  }, [data]);

  useEffect(() => {
    if(result.data){
      setBooks(result.data.allBooks)
    }
  },[result.data])

  if (!props.show) {
    return null
  }

  if (loading) return <div>loading...</div>


  const handleFilter = (e) => {
    if(e.target.innerText === 'all genres'){
      setP(e.target.innerText)
      setBooks(data.allBooks)
      return
    }
    
    setP(e.target.innerText)
    allbooksT({variables:{genres:e.target.innerText}})
  };


  return (
    <div>
      <h2>books</h2>
      <p>{`in genres ${p}`}</p>
      <table >
        <tbody>
          <tr >
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {
            [...books].map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div>
        <button onClick={(e) => handleFilter(e)} >refactoring</button>
        <button onClick={(e) => handleFilter(e)} >agile</button>
        <button onClick={(e) => handleFilter(e)} >patterns</button>
        <button onClick={(e) => handleFilter(e)} >desing</button>
        <button onClick={(e) => handleFilter(e)} >crime</button>
        <button onClick={(e) => handleFilter(e)} >classic</button>
        <button onClick={(e) => handleFilter(e)} >all genres</button>
      </div>
    </div>
  )
}

export default Books
