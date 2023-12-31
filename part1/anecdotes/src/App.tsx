import { useState } from 'react';
import './App.css'

interface Votes {
  [key: number]: number;
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast is to go well.'
  ];

  const [selected, setSelected] = useState<number>(Math.floor(Math.random() * 8));
  const [votes, setVotes] = useState<Votes>({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 });

  const handleSelectText = () => {
    setSelected(Math.floor(Math.random() * 8));
  };

  const handleSelectVotes = () => {
    const updatedVotes: Votes = { ...votes };
    updatedVotes[selected] = (updatedVotes[selected] || 0) + 1;
    setVotes(updatedVotes);
  };
  console.log(votes)
  console.log('max vote', anecdotes[Math.max(...Object.values(votes))])
  const values = Object.values(votes);
  const maxVote = Math.max(...values);
  const maxVoteIndex = values.indexOf(maxVote);

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleSelectVotes}>vote</button>
      <button onClick={handleSelectText}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[maxVoteIndex]}</p>
      <p>has {Math.max(...values)} votes</p>

    </div>
  );
}

export default App;
