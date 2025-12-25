import axios from "axios"

const getAll = () => {
    const promise = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    return promise.then(response => response.data)
}

export default {getAll}