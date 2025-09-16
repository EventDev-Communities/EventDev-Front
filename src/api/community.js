import { API_BASE_URL } from '../config/api'

const generateSlug = (name) => {
  if (!name) return ''
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export const getCommunities = async () => {
  const response = await fetch(`${API_BASE_URL}/community`, {
    credentials: 'include'
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const getUserCommunity = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/community/my-community`, {
      credentials: 'include' // Inclui cookies de sessão
    })

    if (!response.ok) {
      return null
    }

    // Verificar se há conteúdo antes de tentar fazer parse JSON
    const text = await response.text()
    if (!text.trim()) {
      return null
    }

    return JSON.parse(text)
  } catch (error) {
    console.error('Erro ao buscar comunidade do usuário:', error)
    return null
  }
}

export const getCommunityById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/community/${id}`, {
    credentials: 'include'
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const getCommunityBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/community`, {
      credentials: 'include'
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const allCommunities = await response.json()

    let community = allCommunities.find((c) => c.slug === slug)
    if (community) return community

    community = allCommunities.find((c) => generateSlug(c.name) === slug)
    if (community) return community

    if (!isNaN(slug)) {
      community = allCommunities.find((c) => c.id === slug || c.id === parseInt(slug))
      if (community) return community
    }

    const normalizedSlug = slug.replace(/-/g, ' ').toLowerCase()
    community = allCommunities.find((c) => c.name && c.name.toLowerCase().includes(normalizedSlug))

    return community || null
  } catch (error) {
    throw new Error(`Erro ao buscar comunidade: ${error.message}`)
  }
}

export const createCommunity = async (communityData, authToken) => {
  const payload = {
    name: communityData.nome,
    description: communityData.descricao || '',
    phone_number: communityData.telefone || '',
    link_website: communityData.link_website || '',
    link_instagram: communityData.link_instagram || '',
    link_linkedin: communityData.link_linkedin || '',
    link_github: communityData.link_github || '',
    logo_url: typeof communityData.logo_url === 'string' ? communityData.logo_url : communityData.logo_url?.url || '',
    is_active: true
  }

  // Remove campos vazios ou inválidos
  Object.keys(payload).forEach((key) => {
    if (payload[key] === '' || payload[key] === null || payload[key] === undefined) {
      delete payload[key]
    }
  })

  const headers = { 'Content-Type': 'application/json' }
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`
  }

  const response = await fetch(`${API_BASE_URL}/community`, {
    method: 'POST',
    headers,
    credentials: 'include', // Para incluir cookies de sessão do SuperTokens
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Erro da API:', errorText)
    throw new Error(`Erro ${response.status}: ${errorText}`)
  }

  return response.json()
}

export const updateCommunity = async (id, communityData) => {
  const payload = {
    name: communityData.nome,
    email: communityData.email,
    description: communityData.descricao || '',
    phone: communityData.telefone || '',
    website_url: communityData.link_website || '',
    instagram_url: communityData.link_instagram || '',
    linkedin_url: communityData.link_linkedin || '',
    github_url: communityData.link_github || '',
    logo_url: typeof communityData.logo_url === 'string' ? communityData.logo_url : communityData.logo_url?.url || '',
    slug: generateSlug(communityData.nome),
    updated_at: new Date().toISOString()
  }

  const response = await fetch(`${API_BASE_URL}/community/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Erro da API:', errorText)
    throw new Error(`Erro ${response.status}: ${errorText}`)
  }

  return response.json()
}

export const deleteCommunity = async (id) => {
  const response = await fetch(`${API_BASE_URL}/community/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error('Erro ao excluir comunidade')
  }

  return true
}
