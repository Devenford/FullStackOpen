import {useState} from 'react'
import Filter from './components/FilterPeople'
import PersonForm from './components/PersonForm'
import People from './components/DisplayPeople'

const App = () => {
  const [people, setPeople] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const peopleToShow = people.filter(person => (person.name.toLowerCase()).includes(nameFilter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    if (people.some((person) => person.name === newName)) {
      alert(`${newName} has already been added to the phonebook`)
    }
    else {
    const newPerson = {name : newName, number: newNumber, id: people.length + 1}
    setPeople(people.concat(newPerson))
    setNewName('')
    setNewNumber('')
    }
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

      <People peopleToShow={peopleToShow}/>
    </div>
  )
}

export default App