import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'


const Button = ({ click, text }) => {
  return (
    <button onClick={click}>{text}</button>
  )
}


const Statistics = ({ good, neutral, bad }) => {
  let all = (good + neutral + bad);
  let average = all === 0 ? 0 : ((good-bad) / all); 
  let positive = all === 0 ? '0%' : `${((good / all) * 100)}%`;

  return (
    <>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {all}</p>
      <p>average: {average}</p>
      <p>positive: {positive}</p>
      
    </>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  
  const feedBack = type => {
    if (type === 'good') {
      setGood(prevGood => prevGood + 1);
    } else if (type === 'neutral') {
      setNeutral(prevNeutral => prevNeutral + 1);
    } else if (type === 'bad') {
      setBad(prevBad => prevBad + 1);
    }
  };

  return (
    <div>
      <h1>
        give feeback
      </h1>
      <p>
        <Button click={() => feedBack('good')} text={'good'} />
        <Button click={() => feedBack('neutral')} text={'neutral'} />
        <Button click={() => feedBack('bad')} text={'bad'} />
      </p>
      <h3>statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);