export const getEventos = async () => {
  try {
    const [comunidadesRes, eventosRes] = await Promise.all([fetch('http://localhost:4000/comunidades'), fetch('http://localhost:4000/eventos')])

    if (!comunidadesRes.ok || !eventosRes.ok) {
      throw new Error('Network response was not ok')
    }

    const comunidadesData = await comunidadesRes.json()
    const eventosData = await eventosRes.json()

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
