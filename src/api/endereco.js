export const getEnderecos = async () => {
  try {
    const response = await fetch('http://localhost:4000/enderecos')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Erro ao buscar endereços:', error)
    throw error
  }
}

export const getEnderecoById = async (id) => {
  try {
    const response = await fetch(`http://localhost:4000/enderecos/${id}`)
    if (!response.ok) {
      throw new Error('Erro ao buscar endereço')
    }
    return await response.json()
  } catch (error) {
    console.error('Erro ao buscar endereço:', error)
    throw error
  }
}

export const createEndereco = async (dadosEndereco) => {
  try {
    const payload = {
      ...dadosEndereco,
      criado_em: new Date().toISOString(),
      atualizado_em: new Date().toISOString()
    }

    const response = await fetch('http://localhost:4000/enderecos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error('Erro ao criar endereço')
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao criar endereço:', error)
    throw error
  }
}

export const updateEndereco = async (id, dadosEndereco) => {
  try {
    const payload = {
      ...dadosEndereco,
      atualizado_em: new Date().toISOString()
    }

    const response = await fetch(`http://localhost:4000/enderecos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error('Erro ao atualizar endereço')
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao atualizar endereço:', error)
    throw error
  }
}

export const deleteEndereco = async (id) => {
  try {
    const response = await fetch(`http://localhost:4000/enderecos/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Erro ao excluir endereço')
    }

    return true
  } catch (error) {
    console.error('Erro ao excluir endereço:', error)
    throw error
  }
}

export const getEnderecoByCep = async (cep) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json`)
    if (!response.ok) {
      throw new Error('Erro ao buscar CEP')
    }
    const data = await response.json()
    if (data.erro) {
      throw new Error('CEP não encontrado')
    }
    return {
      rua: data.logradouro || '',
      bairro: data.bairro || '',
      cidade: data.localidade || '',
      estado: data.uf || ''
    }
  } catch (error) {
    console.error('Erro ao buscar endereço pelo CEP:', error)
    throw error
  }
}
