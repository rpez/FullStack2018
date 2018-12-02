import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteID = (props) => {
    if (window.confirm(`poistetaanko ${props.name}`)) {
        const request = axios.delete(`${baseUrl}/${props.id}`)
        return request.then(response => response.data)
    }
}

const update = (id, newObject) => {
    if (window.confirm(`muokataanko ${newObject.name}`)) {
        const request = axios.put(`${baseUrl}/${id}`, newObject)
        return request.then(response => response.data)
    }
}

export default { getAll, create, deleteID, update }