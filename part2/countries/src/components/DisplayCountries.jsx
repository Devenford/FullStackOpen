const DisplayCapital = ({capitals}) => {
    return (
        <ul>
            {capitals.map((capital, index) => <li key={index}>{capital}</li>)}
        </ul>
    )
}

const DisplayLanguages = ({languages}) => {
    const entries = Object.entries(languages)

    return (
        <ul>
            {entries.map(([key, value])  => <li key={key}>{value}</li>)}
        </ul>
    )
}

const DisplayEachCountry = ({country, setInputCountry}) => {
    const countryName = country.name.common

    return (
        <li>
            {countryName}
            <button onClick={() => setInputCountry(countryName)}>Show</button>
        </li>
    )
}

const DisplayCountries = ({countries, inputCountry, setInputCountry}) => {
    if (countries===null || inputCountry==='') {
        return null
    }
    
    const countriesToDisplay = countries.filter(country =>
        country.name.common.toLowerCase().startsWith(inputCountry.toLowerCase()))

    const count = countriesToDisplay.length

    if (count>10) {
        return <div>
            Too many matches, specify another filter
        </div>
    }

    if(count>1) {
        return (
            <ul>
                {countriesToDisplay.map(country =>
                    <DisplayEachCountry key={country.cca3} country={country} setInputCountry={setInputCountry}/>
                )}
            </ul>
        )
    }

    if (count===1) {
        const selectedCountry = countriesToDisplay[0]

        return (
            <div>
                <h1>{selectedCountry.name.common}</h1>
                <h2>Capital:</h2> <DisplayCapital capitals={selectedCountry.capital}/>
                <h2>Area:</h2> {selectedCountry.area}

                <h2>Languages:</h2>
                <DisplayLanguages languages={selectedCountry.languages}/>
                <img src={selectedCountry.flags.png}/>
            </div>
        )
    }

    return null
}

export default DisplayCountries