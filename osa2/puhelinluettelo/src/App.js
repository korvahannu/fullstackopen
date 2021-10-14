import React, { useState, useEffect } from 'react'
import personServices from './services/personServices.js'

const Notification = ({message}) => {
  if(message === null)
    return null;

  return (
    <div className='notification'>
      {message}
    </div>
  );
}

const Error = ({message}) => {
  if(message === null)
    return null;
  
  return (
    <div className='error'>
      {message}
    </div>
  );
}

const Filter = ({filter, inputChange_filter}) => {

  return (

    <div>
      filter shown with <input value={filter} onChange={inputChange_filter} />
    </div>

  );
}

const PersonForm = (props) => {
  return (

    <form onSubmit={props.submitForm}>
    <div>
      name: <input value={props.newName} onChange={props.inputChange_newName} />
      <br />
      number = <input value={props.newNumber} onChange={props.inputChange_newNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

  );
}

const Persons = ({setPersons, personList, filter, notif}) => {

  return(

  <div>

  {
  personList.map(
    person => {
      if(person.name.toLowerCase().includes(filter.toLowerCase()))
      {
        return (
          <div key={person.name}>
            {person.name} {person.number}
            <button onClick={()=> {
              if(window.confirm(`Delete ${person.name}?`))
              {
                personServices.deletePerson(person.id)
                setPersons(personList.filter(per => per.id !== person.id))
                notif(`Deleted ${person.name}`, 5000);
              }
              }}>
              delete
            </button>
          </div>
        )
      }
      else  return(null);
    }
  )
  }
  
  </div>

  );
}

const App = () => {

  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [filter, setFilter] = useState('');

  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);


  const inputChange_newName = event => setNewName(event.target.value);
  const inputChange_newNumber = event => setNewNumber(event.target.value);
  const inputChange_filter = event => setFilter(event.target.value);

  function Notify(message, duration) {
    setNotification(message)

    setTimeout(
      ()=>setNotification(null)
      ,duration
    )
  }

  function ErrorMessage(message, duration) {
    setErrorMessage(message)

    setTimeout(
      ()=>setErrorMessage(null)
      ,duration
    )
  }

  const hook = () => 
  {
    personServices.getAll()
    .then(personList => setPersons(personList));
  }

  useEffect(hook, []);

  const submitForm = (event) => {
    event.preventDefault();
    
    const newPerson = {
      name: newName,
      number: newNumber
    }

    let checkDouble = persons.filter(person => person.name.toLowerCase() === newPerson.name.toLocaleLowerCase());

    if(checkDouble.length > 0)
    {
      if(window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`))
      {
        const updatedPerson = {
          id: checkDouble[0].id,
          name: newPerson.name,
          number: newPerson.number
        }

        personServices
        .updatePerson(updatedPerson.id, updatedPerson)
        .then (update => {
          Notify(`Updated phonenumber of ${update.name}`, 5000);
          setPersons(
            persons.map(person => person.id === update.id ? update : person)
          );

        })
        .catch(error => {
          
          console.log("HEI HEI SE OLEN MINÄ" +  error);
          ErrorMessage(`Information of ${newPerson.name} has already been removed from server`, 5000);

          setPersons(
            persons.filter(person => person.id !== updatedPerson.id)
          );

        });
      }
    }
    else
    {
      personServices
      .addPerson(newPerson)
      .then(newGuy => {
        setPersons(persons.concat(newGuy));

        Notify(`Added ${newGuy.name}`, 5000)
      });
    }

    setNewName("");
    setNewNumber("");
  }

  // console.log(`Nykyinen on ${newName} numerolla ${newNumber}`); // Tämä on toinen tapa tulostaa muuttujia tekstin joukkoon. huom vain `` kelpaa, ei '' eikä ""

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />
      <Error message={errorMessage} />

      <Filter filter={filter} inputChange_filter={inputChange_filter} />

      <h2>Add new</h2>

      <PersonForm submitForm={submitForm} newName = {newName} inputChange_newName = {inputChange_newName} newNumber = {newNumber} inputChange_newNumber = {inputChange_newNumber} />

      <h2>Numbers</h2>

      <Persons setPersons={setPersons} notif={Notify} personList={persons} filter={filter} />


    </div>
  )

}

export default App