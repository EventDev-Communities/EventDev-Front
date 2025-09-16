import { createContext, useEffect, useState } from 'react'
import Session from 'supertokens-auth-react/recipe/session'

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  loading: true,
  signOut: () => {},
  checkAuth: () => {}
})

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const checkAuth = async () => {
    try {
      setLoading(true)
      const sessionExists = await Session.doesSessionExist()

      if (sessionExists) {
        setIsAuthenticated(true)

        // Buscar dados do usuário
        try {
          const response = await fetch('http://localhost:5122/api/v1/auth/me', {
            method: 'GET',
            credentials: 'include'
          })

          if (response.ok) {
            const userData = await response.json()
            setUser(userData.user)
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error)
          // Manter autenticado mesmo se não conseguir buscar dados do usuário
        }
      } else {
        setIsAuthenticated(false)
        setUser(null)
      }
    } catch (error) {
      console.error('Erro ao verificar sessão:', error)
      setIsAuthenticated(false)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await Session.signOut()
      setIsAuthenticated(false)
      setUser(null)
      window.location.href = '/login'
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      // Forçar logout local mesmo se der erro
      setIsAuthenticated(false)
      setUser(null)
      window.location.href = '/'
    }
  }

  useEffect(() => {
    checkAuth()

    // Não há addEventListener no SuperTokens React, mas podemos verificar periodicamente
    // ou usar outros métodos de sincronização se necessário
  }, [])

  const value = {
    isAuthenticated,
    user,
    loading,
    signOut,
    checkAuth
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
export { AuthContext }
