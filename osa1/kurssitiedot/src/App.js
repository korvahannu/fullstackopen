import React, { useState } from 'react'

const Header = (eiPropslol) => {

  const { header } = eiPropslol

  return(<h1>{header}</h1>)
}

const Part = (props) => (
  <p>{props.part1} {props.part2}</p>
)

const Content = (props) => (


  <div>
    <Part part1={props.parts[0].name} part2={props.parts[0].exercises} />
    <Part part1={props.parts[1].name} part2={props.parts[1].exercises} />
    <Part part1={props.parts[2].name} part2={props.parts[2].exercises} />
  </div>
)

const Total = (props) => {

  let exerciseCount = 0;
  props.parts.forEach(value => {
    exerciseCount += value.exercises
  });
  return(
    <p>Number of excercises {exerciseCount}</p>
  )

}


const App = () => {


  const course = {

    name: 'Half Stack application development',

    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header header={course.name} />

      <Content parts = {course.parts} />

      <Total parts = {course.parts} />
    </div>
  )
}

export default App