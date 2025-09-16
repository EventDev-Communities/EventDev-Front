import { API_BASE_URL } from '../config/api'

export const getEvents = async () => {
  try {
    const [communitiesRes, eventsRes, addressesRes] = await Promise.all([
      fetch(`${API_BASE_URL}/community`, { credentials: 'include' }),
      fetch(`${API_BASE_URL}/event`, { credentials: 'include' }),
      fetch(`${API_BASE_URL}/address`, { credentials: 'include' })
    ])

    if (!communitiesRes.ok || !eventsRes.ok || !addressesRes.ok) {
      throw new Error('Network response was not ok')
    }

    const communitiesData = await communitiesRes.json()
    const eventsData = await eventsRes.json()
    const addressesData = await addressesRes.json()

    const communitiesMap = communitiesData.reduce((acc, community) => {
      acc[community.id] = community
      return acc
    }, {})

    const addressesMap = addressesData.reduce((acc, address) => {
      acc[address.id] = address
      return acc
    }, {})

    return eventsData.map((event) => ({
      ...event,
      modalidade: event.modality?.toLowerCase() || '',
      modality: event.modality,
      community: communitiesMap[event.id_community] || null,
      address: event.id_address ? addressesMap[event.id_address] || null : null
    }))
  } catch (error) {
    console.error('Erro ao buscar eventos:', error)
    throw error
  }
}

export const createEvent = async (communityId, eventData) => {
  try {
    const payload = {
      title: eventData.title,
      description: eventData.description,
      start_date_time: eventData.start_date_time,
      end_date_time: eventData.end_date_time,
      modality: eventData.modality,
      link: eventData.link || null,
      capa_url: eventData.capa_url || null,
      is_active: eventData.is_active ?? true,

      ...(eventData.modality !== 'ONLINE' &&
        eventData.address && {
          address: {
            cep: eventData.address.cep,
            state: eventData.address.state,
            city: eventData.address.city,
            neighborhood: eventData.address.neighborhood,
            streetAddress: eventData.address.streetAddress,
            number: eventData.address.number
          }
        })
    }

    const response = await fetch(`${API_BASE_URL}/event/${communityId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Erro da API:', errorText)

      let errorMessage = 'Erro ao criar evento'
      try {
        const errorData = JSON.parse(errorText)
        if (errorData.message) {
          errorMessage = Array.isArray(errorData.message) ? errorData.message.join(', ') : errorData.message
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e) {
        errorMessage = `Erro ${response.status}: ${errorText}`
      }

      throw new Error(errorMessage)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Erro ao criar evento:', error)
    throw error
  }
}

export const updateEvent = async (id, eventData) => {
  try {
    const payload = {
      ...eventData,
      updated_at: new Date().toISOString()
    }

    const response = await fetch(`${API_BASE_URL}/event/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
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

export const deleteEvent = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/event/${id}`, {
      method: 'DELETE',
      credentials: 'include'
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
