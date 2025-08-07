import axios from 'axios'

export const getEventos = async () => {
  try {
    const [comunidadesRes, eventosRes] = await Promise.all([
      axios.get('http://localhost:4000/comunidades'),
      axios.get('http://localhost:4000/eventos')
    ])

    const comunidadesData = comunidadesRes.data
    const eventosData = eventosRes.data

    const comunidadesMap = comunidadesData.reduce((acc, comunidade) => {
      acc[comunidade.id] = comunidade
      return acc
    }, {})

    return eventosData.map((evento) => ({
      ...evento,
      comunidade: comunidadesMap[evento.id_comunidade] || null
    }))
  } catch (error) {
    console.error('Erro ao buscar eventos:', error)
    throw error
  }
}
