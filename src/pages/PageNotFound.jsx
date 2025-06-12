import notfound from '@/shared/assets/static/images/not-found.png'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          width: { xs: '100%', md: '90%' },
          height: { xs: 'auto', md: '100vh' },
          px: { xs: 2, md: 6 },
          py: { xs: 4, md: 8 },
          gap: { xs: 4, md: 8 },
          mt: { xs: '64px', md: 0 },
          margin: 'auto'
        }}>
        <Container
          sx={{
            textAlign: { xs: 'center', md: 'left' },
            flex: 1
          }}>
          <Typography
            variant='h1'
            sx={{
              fontSize: { xs: '36px', sm: '48px', md: '64px', lg: '105px' },
              lineHeight: 1.2,
              color: '#4285F4',
              mb: { xs: 2, md: 1 }
            }}>
            404
          </Typography>

          <Typography
            variant='h4'
            sx={{
              fontFamily: 'Inter',
              fontSize: { xs: '1.5rem', md: '2.125rem' },
              mb: { xs: 2, md: 2 }
            }}>
            OOOps! <br />
            Página não Encontrada
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Inter',
              color: '#B0B0B0',
              fontSize: '1rem',
              mb: { xs: 3, md: 4 }
            }}>
            Esta página não existe ou foi removida! <br />
            Sugerimos que você volte para a página inicial.
          </Typography>

          <Button
            component={Link}
            to='/'
            variant='contained'
            color='primary'
            sx={{
              px: { xs: 4, md: 6 },
              py: { xs: 1.5, md: 2 },
              fontSize: { xs: '0.9rem', md: '1rem' },
              borderRadius: '12px'
            }}>
            Voltar para Home
          </Button>
        </Container>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <img
            src={notfound}
            alt='Page Not Found'
            style={{
              maxWidth: '100%',
              height: 'auto',
              width: '80%',
              objectFit: 'contain',
              marginLeft: '70px'
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-end' },
          px: { xs: 2, md: 12 },
          mt: { xs: 4, md: 2 }
        }}>
        <Typography
          component={Link}
          sx={{ color: '#B0B0B0', textDecoration: 'none', fontSize: '0.85rem' }}
          to='https://www.figma.com/@thisuix571'>
          Design by: Mohammed Jawed
        </Typography>
      </Box>
    </>
  )
}
