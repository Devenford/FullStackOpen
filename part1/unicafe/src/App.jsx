import { useState } from "react"

const Statistics = (props) => {

  return (
    <div>
      <h2>Statistics</h2>
      <p>good {props.good}
        <br />neutral {props.neutral}
        <br />bad {props.bad}
        <br />all {props.good + props.neutral + props.bad}
        <br />average {(props.good-props.bad)/(props.good + props.neutral + props.bad)}
        <br />positive {props.good/(props.good  + props.neutral  + props.bad)}
      </p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App