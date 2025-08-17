import { useState } from 'react'

import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import MenuIcon from '@mui/icons-material/Menu'

import logoImage from '@/shared/assets/static/images/logo.png'
import ThemeToggle from '@/shared/components/ThemeToggle'

const pages = ['Eventos', 'Comunidades']
const settings = ['Logout']

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  // const [currentUser, setCurrentUser] = useState(null)
  const [currentUser] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLoginClick = () => {
    /* Criar lógica de login
    setCurrentUser('usuarioLogado')
    window.location.change()
    */
  }

  const handleCreateEvent = () => {
    /* Criar lógica de login
    setCurrentUser('event')
    window.location.change()
    */
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
              {pages.map((page) => (
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
              ))}
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
                    color: 'primary.main'
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
              alignItems: 'center'
            }}>
            {!currentUser ? (
              <Button
                href='/login'
                variant='contained'
                onClick={handleLoginClick}>
                Entrar
              </Button>
            ) : (
              <Tooltip>
                <Button
                  href='/login'
                  onClick={handleCreateEvent}
                  sx={{
                    color: 'white',
                    textWrap: 'nowrap',
                    backgroundColor: '#FC692D',
                    justifyContent: 'space-between'
                  }}>
                  Criar Evento
                </Button>
                <IconButton
                  id='logged'
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0,
                    ml: '0.65rem'
                  }}>
                  <Avatar
                    alt='Sharp'
                    src='/static/images/avatar/2.png'
                  />
                </IconButton>
              </Tooltip>
            )}
            <Menu
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{
                mt: '55px'
              }}>
              <MenuItem>
                <ThemeToggle />
              </MenuItem>
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={handleCloseUserMenu}>
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
