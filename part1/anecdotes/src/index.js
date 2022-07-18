import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

const Button = ({text,click}) => {
  return (
    <button onClick={click}>{text}</button>
  );
}

const App = (props) => {

  const [selected, setSelected] = useState(0);

  const random = () => {
    const randoNumber = Math.round(Math.random() * 5);
    setSelected(randoNumber);
  }

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <Button click={random} text={'next anecdote'}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App anecdotes={anecdotes} />
);