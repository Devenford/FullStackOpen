import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const promise = axios.get(baseURL)
    return promise.then(response => response.data)
}

const create = newObject => {
    const promise = axios.post(baseURL, newObject)
    return promise.then(response => response.data)
}

const deletion = id => {
    return axios.delete(`${baseURL}/${id}`)
}

export default {getAll, create, deletion}