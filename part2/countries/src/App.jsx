import {useState, useEffect} from 'react'
import dataService from './services/retrieveData'
import DisplayCountries from './components/DisplayCountries'

const App = () => {
    const [countries, setCountries] = useState(null)
    const [inputCountry, setInputCountry] = useState('')

    useEffect(() => {
        dataService
            .getAll()
            .then(fetchedData => {
                setCountries(fetchedData)
            })
    }, [])

    const handleInput = (event) => {
        setInputCountry(event.target.value)
    }

    return (
        <div>
            find countries:
            <input onChange={handleInput}/>
            <DisplayCountries countries={countries} inputCountry={inputCountry} setInputCountry={setInputCountry}/>
        </div>
    )
}

export default App