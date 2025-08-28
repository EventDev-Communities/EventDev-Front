export const getEventos = async () => {
  try {
    const [comunidadesRes, eventosRes, enderecosRes] = await Promise.all([
      fetch('http://localhost:4000/comunidades'),
      fetch('http://localhost:4000/eventos'),
      fetch('http://localhost:4000/enderecos')
    ])

    if (!comunidadesRes.ok || !eventosRes.ok || !enderecosRes.ok) {
      throw new Error('Network response was not ok')
    }

    const comunidadesData = await comunidadesRes.json()
    const eventosData = await eventosRes.json()
    const enderecosData = await enderecosRes.json()

    const comunidadesMap = comunidadesData.reduce((acc, comunidade) => {
      acc[comunidade.id] = comunidade
      return acc
    }, {})

    const enderecosMap = enderecosData.reduce((acc, endereco) => {
      acc[endereco.id] = endereco
      return acc
    }, {})

    return eventosData.map((evento) => ({
      ...evento,
      comunidade: comunidadesMap[evento.id_comunidade] || null,
      endereco: evento.id_endereco ? enderecosMap[evento.id_endereco] || null : null
    }))
  } catch (error) {
    console.error('Erro ao buscar eventos:', error)
    throw error
  }
}

export const createEvento = async (dadosEvento) => {
  try {
    const payload = {
      ...dadosEvento,
      criado_em: new Date().toISOString(),
      atualizado_em: new Date().toISOString()
    }

    const response = await fetch('http://localhost:4000/eventos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error('Erro ao criar evento')
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao criar evento:', error)
    throw error
  }
}

export const updateEvento = async (id, dadosEvento) => {
  try {
    const payload = {
      ...dadosEvento,
      atualizado_em: new Date().toISOString()
    }

    const response = await fetch(`http://localhost:4000/eventos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error('Erro ao atualizar evento')
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao atualizar evento:', error)
    throw error
  }
}

export const deleteEvento = async (id) => {
  try {
    const response = await fetch(`http://localhost:4000/eventos/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Erro ao excluir evento')
    }

    return true
  } catch (error) {
    console.error('Erro ao excluir evento:', error)
    throw error
  }
}
