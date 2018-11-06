import axios from 'axios'
const baseUrl = 'http://localhost:3002/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const deleteID = (props) => {
    if (window.confirm(`poistetaanko ${props.name}`)) {
        return axios.delete(`${baseUrl}/${props.id}`)
    }
}

export default { getAll, create, deleteID }