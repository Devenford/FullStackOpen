import {useState} from 'react'

const App = () => {
  const [people, setPeople] = useState([{name: 'Arto Hellas'}])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (people.some((person) => person.name === newName)) {
      alert(`${newName} has already been added to the phonebook`)
    }
    else {
    const newPerson = {name : newName}
    setPeople(people.concat(newPerson))
    setNewName('') 
    }
  }

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleInputChange}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {people.map((person) => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App