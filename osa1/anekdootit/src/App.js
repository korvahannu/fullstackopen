import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const AnecdoteWithVotes = ({text, votes}) =>  (

  <p>
  {text} <br/ >
  has {votes} votes
  </p>

)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, updateVote] = useState([])

  // Alustetaan votes - taulukko nollilla
  if(isNaN(votes[0]))
    for(let i = 0; i < anecdotes.length; i++)
      votes[i] = 0;

  let mostVotes = 0;

  for(let i = 0; i < anecdotes.length+1; i++)
  {
    if(votes[i] > votes[mostVotes])
    {
      mostVotes = i;
    }
  }

  let counter = 1;
  counter++;
  console.log("Counter: ", counter);

  // Haetaan satunnainen uusi anecdootti
  const newAnecdote = () => 
  {
    const newSelection = Math.floor(Math.random() * anecdotes.length)
    setSelected(newSelection);
  }

  // Äänestetään nykyistä anecdoottia
  const voteCurrentAnecdote = () => 
  {
    const copy = [...votes];
    copy[selected] += 1
    updateVote(copy);
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <AnecdoteWithVotes text={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={voteCurrentAnecdote} text="vote" />
      <Button handleClick={newAnecdote} text="next anecdote" />

      <h1>Anecdote with most votes</h1>
      <AnecdoteWithVotes text={anecdotes[mostVotes]} votes={votes[mostVotes]} />
    </div>
  )
}

export default App