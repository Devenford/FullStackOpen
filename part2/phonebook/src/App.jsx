import {useState, useEffect} from 'react'
import Filter from './components/FilterPeople'
import PersonForm from './components/PersonForm'
import People from './components/DisplayPeople'
import axios from 'axios'
import dataService from './services/data'

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const hook = () => {
    dataService
      .getAll()
      .then(initialData => setPeople(initialData))
  }

  useEffect(hook, [])

  const peopleToShow = people.filter(person => (person.name.toLowerCase()).includes(nameFilter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const found = people.find((person) => person.name === newName)

    if(found === undefined) {
      const newPerson = {name : newName, number: newNumber}

      dataService
        .create(newPerson)
        .then(returnedContact => {
          setPeople(people.concat(returnedContact))
          setNewName('')
          setNewNumber('')
        })
    }
    else {
      if(confirm(`${newName} has already been added to the phonebook, replace the old number with the new one?`)) {
        const updatedPerson = {...found, number: newNumber}

        dataService
          .update(found.id, updatedPerson)
          .then(returnedPerson => {
            setPeople(people.map(person => person.id===returnedPerson.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }

  const deletePerson = (id) => {
    setPeople(people.filter(person => person.id!==id))
  }

  const handleInputNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleInputNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      
      <h2>Add a New Person</h2>
      <PersonForm formOnSubmit={addPerson} nameValue={newName} nameOnChange={handleInputNameChange} numberValue={newNumber} numberOnChange={handleInputNumberChange}/>

      <h2>Numbers</h2>
      <Filter value={nameFilter} onChange={handleFilterChange}/>

      <People peopleToShow={peopleToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App