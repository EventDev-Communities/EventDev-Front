import { useState } from 'react'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Toolbar from '@mui/material/Toolbar'
import MenuItem from '@mui/material/MenuItem'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import MenuIcon from '@mui/icons-material/Menu'

import ThemeToggle from '@/shared/components/ThemeToggle'
import logoImage from '@/shared/assets/static/images/logo.png'

const pages = ['Eventos', 'Comunidades']
const settings = ['Logout']

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

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
    setCurrentUser('usuarioLogado')
    window.location.change()
  }

  const handleCreateEvent = () => {
    setCurrentUser('event')
    window.location.change()
  }

  return (
    <AppBar
      position='static'
      color='transparent'
    >
      <Container
        maxWidth='xl'
        sx={{
          display: 'flex',
          height: '4.5rem',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Link href='/'>
          <img
            src={logoImage}
            alt='Logo'
            width={80}
          />
        </Link>

        <Toolbar
          sx={{
            paddingRight: '0 !important',
            width: {
              sm: '100%'
            }
          }}
        >
          <Box
            sx={{
              flexGrow: 0,
              mr: '0.65rem',
              display: {
                xs: 'flex',
                sm: 'none'
              }
            }}
          >
            <IconButton
              id='long-button'
              aria-label='more'
              aria-haspopup='true'
              aria-expanded={anchorElNav ? 'true' : undefined}
              aria-controls={anchorElNav ? 'long-menu' : undefined}
              onClick={handleOpenNavMenu}
              sx={{
                color: 'text.primary',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'secondary.dark'
              }}
            >
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
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
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
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                variant='text'
                color='secondary.light'
                href={`/${page.toLowerCase()}`}
                onClick={handleCloseNavMenu}
                sx={{
                  alignItems: 'normal'
                }}
              >
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
            }}
          >
            {!currentUser ? (
              <Button
                href='/login'
                onClick={handleLoginClick}
                sx={{
                  color: 'white',
                  backgroundColor: '#FC692D'
                }}
              >
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
                  }}
                >
                  Criar Evento
                </Button>
                <IconButton
                  id='logged'
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0,
                    ml: '0.65rem'
                  }}
                >
                  <Avatar
                    alt='Sharp'
                    src='/static/images/avatar/2.jpg'
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
              }}
            >
              <MenuItem>
                <ThemeToggle />
              </MenuItem>
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={handleCloseUserMenu}
                >
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
