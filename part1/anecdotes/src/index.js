import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

const Button = ({text,click}) => {
  return (
    <button onClick={click}>{text}</button>
  );
}

const MostVotes = ({votes,anecdotes}) => {
  let maxVote = 0;
  let index;

  for (const vote in votes) {
    if (votes[vote] > maxVote) {
      maxVote = votes[vote];
      index = vote
    }
  }

  if(maxVote === 0){
    return <p>No hay votos</p>
  }else{
    return (
      <> 
        <p>{anecdotes[index]}</p>
        <p>has {maxVote} votes</p>
      </>
    );
  }
};


const App = (props) => {

  const [selected, setSelected] = useState(0);
  const [votes,setVotes] = useState([0,0,0,0,0,0]);
  const [maxVote, setVote] = useState(0);

  const random = () => {
    const randoNumber = Math.round(Math.random() * 5);
    setSelected(randoNumber);
  }

  const vote = (anecdotesSelected) => {
    setVotes(() => {
      const copy = [...votes];
      copy[anecdotesSelected]++;
      return copy
    })
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button click={random} text={'next anecdote'}/>
      <Button click={() => vote(selected)} text={'vote'}/>
      <h1>Anecdote with most votes</h1>
      <MostVotes votes={votes} anecdotes={props.anecdotes} />
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