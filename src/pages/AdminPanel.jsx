import React, { useState } from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'community'
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    // Verificar se está logado como admin
    try {
      const authCheck = await fetch('http://localhost:5122/api/v1/auth/me', {
        method: 'GET',
        credentials: 'include'
      })

      if (authCheck.ok) {
        const userData = await authCheck.json()
        console.error('Usuário logado:', userData)
        console.error('Papéis do usuário:', userData.user?.roles)
        console.error('É admin?', userData.user?.roles?.includes('admin'))
      } else {
        console.error('Não logado ou sem acesso:', authCheck.status)
      }
    } catch (authError) {
      console.error('Erro ao verificar auth:', authError)
    }

    try {
      const requestBody = {
        email: formData.email,
        password: formData.password,
        role: formData.role
      }

      console.error('Enviando dados:', { email: formData.email, password: '***', role: formData.role })
      console.error('Corpo da requisição completo (sem senha):', { ...requestBody, password: '***' })

      // Usar a rota correta para admin criar usuários
      const response = await fetch('http://localhost:5122/api/v1/auth/admin/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Para incluir cookies de sessão
        body: JSON.stringify(requestBody)
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Usuário criado com sucesso!' })
        setFormData({ email: '', password: '', role: 'community' })
      } else {
        const error = await response.json()
        console.error('Erro detalhado:', error)
        console.error('Array de mensagens:', error.message)
        if (Array.isArray(error.message)) {
          console.error(
            'Mensagens individuais:',
            error.message.forEach((msg, index) => console.error(`${index + 1}:`, msg))
          )
        }

        const errorText = Array.isArray(error.message) ? error.message.join(', ') : error.message || `Erro ${response.status}: ${response.statusText}`

        setMessage({ type: 'error', text: errorText })
      }
    } catch {
      setMessage({ type: 'error', text: 'Erro de conexão com o servidor' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container
      maxWidth='sm'
      sx={{ paddingTop: '3.5rem' }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #e8e8e8',
          padding: '2rem',
          width: '100%',
          maxWidth: '670px',
          margin: '2rem auto',
          borderRadius: '0.625rem'
        }}>
        {/* Cabeçalho */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Typography
            variant='h2'
            component='h1'
            sx={{ marginBottom: '1rem' }}>
            <span
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                background: 'linear-gradient(90deg, #f4c542 0%, #fc692d 100%)',
                backgroundClip: 'text'
              }}>
              PAINEL ADMIN
            </span>
          </Typography>
          <Typography
            variant='body1'
            component='p'
            sx={{ color: '#64748B', textAlign: 'center' }}>
            Criar novo usuário na plataforma
          </Typography>
        </Box>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Email */}
          <Box>
            <Typography
              component='label'
              htmlFor='email'
              variant='subtitle1'
              fontWeight='bold'
              sx={{ marginBottom: '0.5rem', display: 'block' }}>
              Email de acesso
            </Typography>
            <TextField
              id='email'
              name='email'
              type='email'
              placeholder='Email de acesso do usuário'
              value={formData.email}
              onChange={handleChange}
              required
              variant='outlined'
              fullWidth
            />
          </Box>

          {/* Senha + Role */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: '1rem'
            }}>
            {/* Senha */}
            <Box sx={{ flex: 1 }}>
              <Typography
                component='label'
                htmlFor='password'
                variant='subtitle1'
                fontWeight='bold'
                sx={{ marginBottom: '0.5rem', display: 'block' }}>
                Senha
              </Typography>
              <TextField
                fullWidth
                id='password'
                name='password'
                type='password'
                placeholder='Digite a senha'
                value={formData.password}
                onChange={handleChange}
                required
                variant='outlined'
              />
            </Box>

            {/* Role */}
            <Box sx={{ flex: 1 }}>
              <Typography
                component='label'
                htmlFor='role'
                variant='subtitle1'
                fontWeight='bold'
                sx={{ marginBottom: '0.5rem', display: 'block' }}>
                Tipo de Usuário
              </Typography>
              <FormControl fullWidth>
                <Select
                  id='role'
                  name='role'
                  value={formData.role}
                  onChange={handleChange}>
                  <MenuItem value='community'>Comunidade</MenuItem>
                  <MenuItem value='user'>Usuário</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Mensagem */}
          {message.text && <Alert severity={message.type}>{message.text}</Alert>}

          {/* Botão */}
          <Button
            type='submit'
            variant='contained'
            disabled={loading}
            fullWidth
            startIcon={
              loading ? (
                <CircularProgress
                  size={20}
                  color='inherit'
                />
              ) : null
            }
            sx={{
              'backgroundColor': '#fc692d',
              'height': '3rem',
              'fontWeight': 700,
              'fontSize': '1.1rem',
              'transition': 'background-color 0.3s ease',
              '&:hover': { backgroundColor: '#bb4618' }
            }}>
            {loading ? 'Criando...' : 'Criar Usuário'}
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default AdminPanel
