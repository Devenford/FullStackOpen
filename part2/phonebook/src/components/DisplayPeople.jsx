import dataService from '../services/data'

const DeleteButton = ({person, deletePerson, setMessage}) => {
    const handleDeletion = () => {
        if(confirm(`Delete ${person.name}?`)) {
            dataService
                .deletion(person.id)
                .then(() => {
                    deletePerson(person.id)
                    setMessage({message: `Deleted ${person.name}`, className: 'success'})
                    setTimeout(() => setMessage({message: null, className: null}), 5000)
                })
                .catch(error => {
                    deletePerson(person.id)
                    setMessage({message: `Information of ${person.name} has already been removed from the server`, className: 'error'})
                    setTimeout(() => setMessage({message: null, className: null}), 5000)
                })
        }
    }

    return (
        <button onClick={handleDeletion}>delete</button>
    )
}

const Person = ({person, deletePerson, setMessage}) => {
    return (
        <li>
            {`${person.name} ${person.number}\t`}
            <DeleteButton person={person} deletePerson={deletePerson} setMessage={setMessage}/>
        </li>
    )
}

const People = ({peopleToShow, deletePerson, setMessage}) => {
    return (
        <ul>
        {peopleToShow.map((person) => <Person key={person.id} person={person} deletePerson={deletePerson} setMessage={setMessage}/>)}
      </ul>
    )
}

export default People