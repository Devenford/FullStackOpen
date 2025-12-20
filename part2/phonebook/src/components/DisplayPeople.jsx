import dataService from '../services/data'

const DeleteButton = ({person, deletePerson}) => {
    const handleDeletion = () => {
        if(confirm(`Delete ${person.name}?`)) {
            dataService
                .deletion(person.id)
                .then(() => {
                    deletePerson(person.id)
                })
        }
    }

    return (
        <button onClick={handleDeletion}>delete</button>
    )
}

const Person = ({person, deletePerson}) => {
    return (
        <li>
            {`${person.name} ${person.number}\t`}
            <DeleteButton person={person} deletePerson={deletePerson}/>
        </li>
    )
}

const People = ({peopleToShow, deletePerson}) => {
    return (
        <ul>
        {peopleToShow.map((person) => <Person key={person.id} person={person} deletePerson={deletePerson}/>)}
      </ul>
    )
}

export default People