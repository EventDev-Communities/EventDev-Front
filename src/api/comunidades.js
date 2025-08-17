export const getComunidades = async () => {
  const response = await fetch('http://localhost:4000/comunidades')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const getComunidadeById = async (id) => {
  const response = await fetch(`http://localhost:4000/comunidades/${id}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const getComunidadeBySlug = async (slug) => {
  const response = await fetch(`http://localhost:4000/comunidades?slug=${slug}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  return data[0] || null
}
