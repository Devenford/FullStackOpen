const Header = (props) => {

  return (
    <h1>{props.title}</h1>
  )
}

const Content = (props) => {

  return (
    <div>
    <Part name={props.parts[0]} exercount={props.exercount[0]} />
    <Part name={props.parts[1]} exercount={props.exercount[1]} />
    <Part name={props.parts[2]} exercount={props.exercount[2]} />
    </div>
  )
}

const Total = (props) => {
  
  return (
    <p>Number of exercises {props.total}</p>
  )
}

const Part = (props) => {

  return (
    <p>{props.name} {props.exercount}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  
  return (
    <div>
      <Header title={course} />
      <Content parts={[part1, part2, part3]} exercount={[exercises1, exercises2, exercises3]} />
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App