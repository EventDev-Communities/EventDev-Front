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

const generateSlug = (nome) => {
  if (!nome) return ''
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export const getComunidadeBySlug = async (slug) => {
  try {
    const response = await fetch('http://localhost:4000/comunidades')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const allCommunities = await response.json()

    let comunidade = allCommunities.find((c) => c.slug === slug)

    if (comunidade) {
      return comunidade
    }

    comunidade = allCommunities.find((c) => generateSlug(c.nome) === slug)

    if (comunidade) {
      return comunidade
    }

    if (!isNaN(slug)) {
      comunidade = allCommunities.find((c) => c.id === slug || c.id === parseInt(slug))
      if (comunidade) {
        return comunidade
      }
    }

    const normalizedSlug = slug.replace(/-/g, ' ').toLowerCase()
    comunidade = allCommunities.find((c) => c.nome && c.nome.toLowerCase().includes(normalizedSlug))

    return comunidade || null
  } catch (error) {
    throw new Error(`Erro ao buscar comunidade: ${error.message}`)
  }
}

export const createComunidade = async (dadosComunidade) => {
  const payload = {
    ...dadosComunidade,
    ativo: true,
    criado_em: new Date().toISOString(),
    atualizado_em: new Date().toISOString(),
    slug: generateSlug(dadosComunidade.nome),
    logo_url: typeof dadosComunidade.logo_url === 'string' ? dadosComunidade.logo_url : dadosComunidade.logo_url?.url || '',
    descricao: dadosComunidade.descricao || ''
  }

  const response = await fetch('http://localhost:4000/comunidades', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}

export const updateComunidade = async (id, dadosComunidade) => {
  const payload = {
    ...dadosComunidade,
    atualizado_em: new Date().toISOString(),
    slug: generateSlug(dadosComunidade.nome),
    logo_url: typeof dadosComunidade.logo_url === 'string' ? dadosComunidade.logo_url : dadosComunidade.logo_url?.url || '',
    descricao: dadosComunidade.descricao || ''
  }

  const response = await fetch(`http://localhost:4000/comunidades/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}

export const deleteComunidade = async (id) => {
  const response = await fetch(`http://localhost:4000/comunidades/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error('Erro ao excluir comunidade')
  }

  return true
}
