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
  const [communityLoading, setCommunityLoading] = useState(false)
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

  // Função para verificar se o usuário tem role community
  const isCommunityUser = () => {
    return user && user.roles && user.roles.includes('community')
  }

  useEffect(() => {
    const fetchUserCommunity = async () => {
      if (isAuthenticated && isCommunityUser()) {
        setCommunityLoading(true)
        try {
          const community = await getUserCommunity()
          setUserCommunity(community)
        } catch (error) {
          console.error('Erro ao buscar comunidade do usuário:', error)
          setUserCommunity(null)
        } finally {
          setCommunityLoading(false)
        }
      } else {
        setUserCommunity(null)
        setCommunityLoading(false)
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

  // Função para determinar o link e texto do botão da comunidade
  const getCommunityButtonProps = () => {
    if (!isCommunityUser()) return null

    if (communityLoading) {
      return {
        text: 'Carregando...',
        href: '#',
        disabled: true
      }
    }

    if (userCommunity) {
      return {
        text: 'Meu Perfil',
        href: `/meu-perfil/${userCommunity.id}`,
        disabled: false
      }
    } else {
      return {
        text: 'Cadastrar Comunidade',
        href: '/cadastro-comunidade',
        disabled: false
      }
    }
  }

  const communityButtonProps = getCommunityButtonProps()

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
            flexGrow: 1,
            justifyContent: 'flex-end',
            width: {
              sm: '100%'
            }
          }}>
          <Box
            sx={{
              flexGrow: 0,
              paddingX: 0,
              display: {
                xs: 'flex',
                sm: 'none'
              },
              alignItems: 'center',
              gap: 1,
              mr: '0.65rem'
            }}>
            {!isAuthenticated ? (
              <Button
                variant='contained'
                onClick={handleLoginClick}>
                Entrar
              </Button>
            ) : (
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
            )}
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
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {
                  xs: 'block',
                  sm: 'none'
                }
              }}
              PaperProps={{
                sx: {
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: '100vw',
                  height: '100vh',
                  maxWidth: 'none',
                  maxHeight: 'calc(100vh - 16px)',
                  margin: 0,
                  borderRadius: 0,
                  backgroundColor: 'white',
                  boxShadow: 'none',
                  overflow: 'hidden'
                }
              }}
              MenuListProps={{
                sx: {
                  padding: 0,
                  height: '100%',
                  maxHeight: 'calc(100vh - 3rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  gap: '1rem',
                  overflowY: 'auto'
                }
              }}>
              <Box sx={{ position: 'absolute', top: 0, right: 0, zIndex: 300, paddingX: '.8rem' }}>
                <IconButton
                  aria-label='Fechar menu'
                  onClick={handleCloseNavMenu}
                  sx={{ color: 'text.main' }}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'>
                    <line
                      x1='18'
                      y1='6'
                      x2='6'
                      y2='18'
                    />
                    <line
                      x1='6'
                      y1='6'
                      x2='18'
                      y2='18'
                    />
                  </svg>
                </IconButton>
              </Box>
              <Box sx={{ paddingTop: '5rem', paddingX: '2rem', paddingBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                          color: 'primary.main'
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
                                  textAlign: 'center',
                                  color: 'gray',
                                  fontWeight: '400',
                                  fontSize: '0.75rem',
                                  cursor: 'default'
                                }}>
                                {getUserRole()}
                              </MenuItem>
                            ]
                          : []),
                        ...(communityButtonProps
                          ? [
                              <MenuItem
                                key='community-action'
                                component={communityButtonProps.disabled ? 'div' : 'a'}
                                href={communityButtonProps.disabled ? undefined : communityButtonProps.href}
                                onClick={handleCloseNavMenu}
                                sx={{
                                  textAlign: 'center',
                                  color: '#FC692D',
                                  fontWeight: '600',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                  opacity: communityButtonProps.disabled ? 0.6 : 1,
                                  cursor: communityButtonProps.disabled ? 'default' : 'pointer'
                                }}>
                                {communityButtonProps.text}
                              </MenuItem>
                            ]
                          : [])
                      ]
                    : [])
                ]}
              </Box>
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              paddingX: 0,
              display: {
                xs: 'none',
                sm: 'flex'
              },
              alignItems: 'center',
              gap: 1
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
                      fontSize: '0.6rem',
                      color: 'gray',
                      fontWeight: 400,
                      alignSelf: 'center'
                    }}>
                    {getUserRole()}
                  </Typography>
                )}
                {communityButtonProps && (
                  <Button
                    variant='text'
                    href={communityButtonProps.disabled ? undefined : communityButtonProps.href}
                    disabled={communityButtonProps.disabled}
                    sx={{
                      color: '#FC692D',
                      fontWeight: '600',
                      opacity: communityButtonProps.disabled ? 0.6 : 1
                    }}>
                    {communityButtonProps.text}
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
