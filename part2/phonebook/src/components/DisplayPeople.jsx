const People = ({peopleToShow}) => {
    return (
        <ul>
        {peopleToShow.map((person) => <li key={person.id}>{person.name} {person.number}</li>)}
      </ul>
    )
}

export default People