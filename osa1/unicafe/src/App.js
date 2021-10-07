import React, { useState } from 'react'

const Button = (props) => (

  <button onClick={props.handleClick}>
    {props.text}
  </button>

)

const StatisticsLine = (props) => (

  <tbody><tr><th>{props.text}</th><th>{props.value}{props.type}</th></tr></tbody>

)

const Statistics = ({good, neutral, bad }) => {

  const total = good+bad+neutral;
  const average = (good-bad) / total;
  const positive = good / total * 100;

  if(good > 0 || neutral > 0 || bad > 0) {
    return(
    <table>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={total} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positive} type="%" />
    </table>
    )
  }
  
  return(<p>No feedback given</p>)

}

const Header = ({text}) => <h1>{text}</h1>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const changeState = (_useState, newValue) =>
  {
      const handler = () => 
      {
        _useState(newValue);
      }

      return handler;
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={changeState(setGood, good+1)} text="good" />
      <Button handleClick={changeState(setNeutral, neutral+1)} text="neutral" />
      <Button handleClick={changeState(setBad, bad+1)} text="bad" />
      <Header text="statistics" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App