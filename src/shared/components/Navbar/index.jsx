import { useState, useEffect } from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import MenuIcon from '@mui/icons-material/Menu'

import logoImage from '@/shared/assets/static/images/logo.png'
import { useAuth } from '@/shared/providers/useAuth'
import { getUserCommunity } from '@/api/community'

const pages = ['Eventos', 'Comunidades']

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [userCommunity, setUserCommunity] = useState(null)
  const { isAuthenticated, signOut, user } = useAuth()

  // Função para determinar a role principal do usuário
  const getUserRole = () => {
    if (!user || !user.roles || user.roles.length === 0) return null

    // Prioridade: admin > community > user
    if (user.roles.includes('admin')) return 'ADMIN'
    if (user.roles.includes('community')) return 'COMMUNITY'
    if (user.roles.includes('user')) return 'USER'

    // Fallback para a primeira role encontrada
    return user.roles[0].toUpperCase()
  }

  useEffect(() => {
    const fetchUserCommunity = async () => {
      if (isAuthenticated && user && user.roles && user.roles.includes('community')) {
        try {
          const community = await getUserCommunity()
          setUserCommunity(community)
        } catch (error) {
          console.error('Erro ao buscar comunidade do usuário:', error)
          setUserCommunity(null)
        }
      } else {
        setUserCommunity(null)
      }
    }

    fetchUserCommunity()
  }, [isAuthenticated, user])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleLoginClick = async () => {
    if (isAuthenticated) {
      // Se estiver logado, fazer logout
      await signOut()
    } else {
      // Se não estiver logado, ir para login
      window.location.href = '/login'
    }
  }

  return (
    <AppBar
      position='fixed'
      color='transparent'
      sx={{
        backgroundColor: 'white',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
      <Container
        maxWidth='xl'
        sx={{
          display: 'flex',
          height: '4.5rem',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <Link href='/'>
          <img
            src={logoImage}
            alt='Logo'
            width={180}
            style={{
              marginTop: '.5rem'
            }}
          />
        </Link>

        <Toolbar
          sx={{
            paddingX: '0 !important',
            width: {
              sm: '100%'
            }
          }}>
          <Box
            sx={{
              flexGrow: 0,
              mr: '0.65rem',
              display: {
                xs: 'flex',
                sm: 'none'
              }
            }}>
            <IconButton
              id='long-button'
              aria-label='more'
              aria-haspopup='true'
              aria-expanded={anchorElNav ? 'true' : undefined}
              aria-controls={anchorElNav ? 'long-menu' : undefined}
              onClick={handleOpenNavMenu}
              sx={{
                color: 'text.main'
              }}>
              <MenuIcon />
            </IconButton>

            <Menu
              id='long-menu'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                mt: '55px',
                display: {
                  sm: 'flex',
                  md: 'none'
                }
              }}>
              {[
                ...pages.map((page) => (
                  <MenuItem
                    key={page}
                    component='a'
                    href={`/${page.toLowerCase()}`}
                    onClick={handleCloseNavMenu}
                    sx={{
                      'textAlign': 'center',
                      'color': 'text.main',
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: 'transparent'
                      }
                    }}>
                    {page}
                  </MenuItem>
                )),
                ...(isAuthenticated
                  ? [
                      ...(getUserRole()
                        ? [
                            <MenuItem
                              key='user-role'
                              onClick={handleCloseNavMenu}
                              sx={{
                                'textAlign': 'center',
                                'color': 'gray',
                                'fontWeight': '400',
                                'fontSize': '0.75rem',
                                'cursor': 'default',
                                '&:hover': {
                                  backgroundColor: 'transparent'
                                }
                              }}>
                              {getUserRole()}
                            </MenuItem>
                          ]
                        : []),
                      ...(userCommunity
                        ? [
                            <MenuItem
                              key='meu-perfil'
                              component='a'
                              href={`/meu-perfil/${userCommunity.id}`}
                              onClick={handleCloseNavMenu}
                              sx={{
                                'textAlign': 'center',
                                'color': '#FC692D',
                                'fontWeight': '600',
                                'display': 'flex',
                                'alignItems': 'center',
                                'gap': 1,
                                '&:hover': {
                                  color: 'primary.main',
                                  backgroundColor: 'transparent'
                                }
                              }}>
                              Meu Perfil
                            </MenuItem>
                          ]
                        : [])
                    ]
                  : [])
              ]}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              ml: '0.65rem',
              columnGap: '10px',
              display: {
                xs: 'none',
                sm: 'flex'
              }
            }}>
            {pages.map((page) => (
              <Button
                key={page}
                variant='text'
                underline='hover'
                onClick={handleCloseNavMenu}
                href={`/${page.toLowerCase()}`}
                sx={{
                  '&': {
                    color: 'text.primary',
                    alignItems: 'normal',
                    fontWeight: '700'
                  },
                  '&:hover': {
                    color: '#E55D2B'
                  }
                }}>
                {page}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              paddingX: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
            {!isAuthenticated ? (
              <Button
                variant='contained'
                onClick={handleLoginClick}>
                Entrar
              </Button>
            ) : (
              <>
                {getUserRole() && (
                  <Typography
                    variant='caption'
                    sx={{
                      fontSize: '0.75rem',
                      color: 'gray',
                      fontWeight: 400,
                      alignSelf: 'center'
                    }}>
                    {getUserRole()}
                  </Typography>
                )}
                {userCommunity && (
                  <Button
                    variant='text'
                    href={`/meu-perfil/${userCommunity.id}`}
                    sx={{
                      'color': '#FC692D',
                      'fontWeight': '600',
                      '&:hover': {
                        backgroundColor: 'rgba(252, 105, 45, 0.1)'
                      }
                    }}>
                    Meu Perfil
                  </Button>
                )}
                <Button
                  variant='outlined'
                  onClick={handleLoginClick}
                  sx={{
                    'color': '#FC692D',
                    'borderColor': '#FC692D',
                    '&:hover': {
                      backgroundColor: '#E55D2B',
                      borderColor: '#E55D2B',
                      color: 'white'
                    }
                  }}>
                  Sair
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
