import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import styles from './Login.module.css'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword'
import { useAuth } from '@/shared/providers/useAuth'

export default function FormLogin() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const { checkAuth } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      const response = await EmailPassword.signIn({
        formFields: [
          { id: 'email', value: email },
          { id: 'password', value: password }
        ]
      })

      if (response.status === 'OK') {
        setMessage({ type: 'success', text: 'Login realizado com sucesso!' })

        // Atualizar o contexto de autenticação
        await checkAuth()

        // Buscar dados do usuário para redirecionamento
        try {
          const userResponse = await fetch('http://localhost:5122/api/v1/auth/me', {
            method: 'GET',
            credentials: 'include'
          })

          if (userResponse.ok) {
            const userData = await userResponse.json()

            // Redirecionar baseado no papel do usuário
            if (userData.user && (userData.user.roles.includes('admin') || userData.user.email === 'admin@eventdev.com')) {
              window.location.href = '/admin'
            } else if (userData.user && userData.user.roles.includes('community')) {
              window.location.href = '/cadastro-comunidade'
            } else {
              window.location.href = '/eventos'
            }
          } else {
            // Fallback se não conseguir buscar dados do usuário
            window.location.href = '/eventos'
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error)
          window.location.href = '/eventos'
        }
      } else if (response.status === 'WRONG_CREDENTIALS_ERROR') {
        setMessage({ type: 'error', text: 'Email ou senha incorretos' })
      } else {
        setMessage({ type: 'error', text: 'Erro no login. Tente novamente.' })
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Erro de conexão com o servidor' })
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      className={styles.container}
      component='form'
      onSubmit={handleSubmit}
      noValidate
      autoComplete='on'>
      <div className={styles.titleContainer}>
        <Typography
          variant='h2'
          component='h2'
          sx={{ marginBottom: '1rem' }}>
          Bem vindo ao <span className={styles.gradientText}>EVENT DEV</span>
        </Typography>
        <Typography
          variant='body1'
          component='p'
          sx={{ color: '#64748B' }}>
          Entre na sua conta agora e comece a criar seus eventos.
        </Typography>
      </div>

      {message.text && (
        <Alert
          severity={message.type}
          sx={{ marginTop: '1rem' }}>
          {message.text}
        </Alert>
      )}

      <div className={styles.formContainer}>
        <Typography
          component='label'
          htmlFor='email'
          variant='subtitle1'
          fontWeight='bold'
          sx={{ marginTop: '1rem' }}>
          Email
        </Typography>
        <TextField
          required
          id='email'
          placeholder='seu@email.com'
          name='email'
          autoComplete='email'
          type='email'
          sx={{ width: '100%' }}
        />
        <Typography
          component='label'
          htmlFor='password'
          variant='subtitle1'
          fontWeight='bold'
          sx={{ marginTop: '1rem' }}>
          Senha
        </Typography>
        <TextField
          id='password'
          placeholder='********'
          name='password'
          type='password'
          autoComplete='current-password'
        />
      </div>
      <Button
        sx={{ marginTop: '1rem', width: '100%' }}
        type='submit'
        variant='contained'
        disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Entrar'}
      </Button>
      <Typography
        variant='body2'
        component='p'
        sx={{ marginTop: '1rem', textAlign: 'center' }}
        underline='hover'>
        Esqueceu a senha?{' '}
        <Link
          href='/reset-password'
          underline='hover'
          color='text.secondary'
          display='block'
          sx={{ color: '#FC692D', textDecoration: 'none', fontWeight: 'bold' }}>
          Redefinir Senha
        </Link>
      </Typography>
      <Typography
        variant='body1'
        component='p'
        sx={{ marginTop: '1.5rem', color: '#64748B', fontSize: '1.20rem' }}>
        Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.
      </Typography>
    </Box>
  )
}
