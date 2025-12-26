import axios from "axios"

const getAll = () => {
    const promise = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    return promise.then(response => response.data)
}

const getWeather = (city) => {
    const api_key = import.meta.env.VITE_SOME_KEY
    const promise = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`)
    return promise.then(response => response.data)
}

export default {getAll, getWeather}