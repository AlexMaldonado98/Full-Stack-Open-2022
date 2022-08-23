export const Anecdote = ({anecdote}) => {
    
   return(
      <div>
        <h1>{`${anecdote.content} by ${anecdote.author}`}</h1>
        <h3>has {anecdote.votes} votes</h3>
        <h3>for more info see <a href='#'>{anecdote.info}</a></h3>
      </div>
   );
};

export default Anecdote