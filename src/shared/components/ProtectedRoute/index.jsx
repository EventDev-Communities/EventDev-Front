import { Navigate } from 'react-router-dom'
import { useAuth } from '@/shared/providers/useAuth'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export default function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, user, loading } = useAuth()

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'white'
        }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    )
  }

  // Se não estiver logado, redireciona para login
  if (!isAuthenticated)
    return (
      <Navigate
        to='/login'
        replace
      />
    )

  // Se roles não foram definidas, só checa autenticação
  if (!roles || roles.length === 0) return children

  // Verifica se o usuário tem alguma das roles permitidas
  const hasAccess = user?.roles?.some((role) => roles.includes(role))

  if (!hasAccess)
    return (
      <Navigate
        to='/'
        replace
      />
    )

  return children
}
