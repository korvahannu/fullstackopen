import React from 'react'

const Header = ({header}) => {
    return(<h1>{header}</h1>)
  }
  
  const Part = (props) => (
    <p>{props.part1} {props.part2}</p>
  )
  
  const Content = (props) => {
    // Koska ei voi suoraan laittaa silmukkaa returnin sisälle
    // se pitää tehdä epäsuorasti täten:
    // Toisaalta esim .map toimii suoraan palauttaen arvon, on se ihmeellinen maailma
  
    let items = []
  
    props.parts.forEach(value =>
      {
        items.push(<Part key={value.id} part1={value.name} part2={value.exercises} />);
      })
  
    return(
    <div>
      {items}
    </div>
    )
  }
  
  const Total = (props) => {
  
    /*
    
    reducen syntaxi:
  
    const jotain = table.reduce(
      function (lopputulos, nykyinenArvo) {
        return lopputus + nykyinen arvo;
      }
      ,0 <== Tämä on parametri jonka reduce tarvitsee, määrää lopputuloksen alkuarvon
    )
    
    */
  
    const total = props.parts.reduce( (totalValue, currentValue) => {
      return totalValue + currentValue.exercises
    }, 0);
  
    return(
      <p>Total of {total} excercises</p>
    )
  
  }

  const Course = ({courses}) => {

    return(
      <div>
  
        {
          courses.map((currentCourse, index) => {
  
            return (
              <div key={currentCourse.id}>
                <Header key={"header"+currentCourse.id} header={currentCourse.name} />
                <Content key={"courses"+currentCourse.id+10} parts={currentCourse.parts} />
                <Total key={"total"+currentCourse.id+100} parts={currentCourse.parts} />
              </div>
            )
  
          })
        }
  
      </div>
    )
  }

  export default Course