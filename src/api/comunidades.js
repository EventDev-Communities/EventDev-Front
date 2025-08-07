import axios from 'axios'

export const getComunidades = async () => {
  const { data } = await axios.get('http://localhost:4000/comunidades')
  return data
}

export const getComunidadeById = async (id) => {
  const { data } = await axios.get(`http://localhost:4000/comunidades/${id}`)
  return data
}

export const getComunidadeBySlug = async (slug) => {
  const { data } = await axios.get(`http://localhost:4000/comunidades?slug=${slug}`)
  return data[0] || null
}
