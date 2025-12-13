const Person = ({person}) => {
    return (
        <li>{person.name} {person.number}</li>
    )
}


const People = ({peopleToShow}) => {
    return (
        <ul>
        {peopleToShow.map((person) => <Person key={person.id} person={person}/>)}
      </ul>
    )
}

export default People