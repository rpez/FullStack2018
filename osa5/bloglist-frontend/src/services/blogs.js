import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }

  await axios.delete(`${baseUrl}/${id}`, config)
}

const update = async (id, newObject) => {
  const newBlog = await axios.put(`${baseUrl}/${id}`, newObject)
  return newBlog
}

export default { getAll, create, update, setToken, deleteBlog }