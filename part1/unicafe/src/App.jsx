import { useState } from "react"

const Button = (props) => {
  return (
    <button onClick={() => props.setState(props.state + 1)}>{props.name}</button>
  )
}

const StatisticLine = (props) => {
  if (props.text=="positive") {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
    </tr>
    )
  }
  else {
    return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
  }
}

const Statistics = (props) => {

  if ((props.good + props.neutral + props.bad)==0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
      
    )
  }
  else {
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good} />
            <StatisticLine text="neutral" value={props.neutral} />
            <StatisticLine text="bad" value={props.bad} />
            <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
            <StatisticLine text="average" value={(props.good-props.bad)/(props.good + props.neutral + props.bad)} />
            <StatisticLine text="positive" value={props.good/(props.good  + props.neutral  + props.bad)} />
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button name="good" state={good} setState={setGood} />
      <Button name="neutral" state={neutral} setState={setNeutral} />
      <Button name="bad" state={bad} setState={setBad} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App