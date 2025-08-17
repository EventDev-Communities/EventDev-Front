import eventImg from '@/shared/assets/static/images/event-img.png'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export default function HeroSection() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #f4c542, #ff9a63)',
        paddingTop: '4rem',
        paddingBottom: '4rem',
        minHeight: '10vh'
      }}>
      <Container maxWidth='xl'>
        <Box
          sx={{
            display: 'flex',

            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' }
          }}>
          <Box sx={{ flex: 1, maxWidth: '600px' }}>
            <Typography
              variant='h1'
              sx={{
                color: 'white',
                fontSize: '55px',
                fontWeight: 'bold',
                lineHeight: '3.5rem',
                marginBottom: '1rem',
                textAlign: { xs: 'left', md: 'left' }
              }}>
              Conecte-se <br />
              com as melhores comunidades dev
            </Typography>

            <Typography
              variant='h5'
              sx={{
                color: 'white',
                fontWeight: '300',
                marginBottom: '2.35rem',
                maxWidth: '500px'
              }}>
              Descubra, participe e crie eventos incríveis com comunidades de desenvolvedores do Nordeste.
            </Typography>

            <Box
              sx={{
                gap: '16px',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                width: { xs: '100%', md: 'auto' },
                paddingBottom: { xs: '5rem', md: '1rem' },
                justifyContent: { xs: 'center', md: 'start' }
              }}>
              <Button
                href='/eventos'
                variant='contained'
                color='primary'
                size='large'
                sx={{
                  height: { xs: 60, md: 'auto' },
                  width: { xs: '100%', md: 'auto' }
                }}>
                Explorar Eventos
              </Button>

              <Button
                href='/criacao-de-eventos'
                variant='contained'
                color='secondary'
                size='large'
                sx={{
                  fontWeight: '700',
                  height: { xs: 60, md: 'auto' },
                  width: { xs: '100%', md: 'auto' }
                }}>
                Criar Eventos
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: { xs: 'center', md: 'end' }
            }}>
            <Box
              component='img'
              src={eventImg}
              alt='Evento'
              sx={{
                borderRadius: '10px',
                width: { xs: '100%', md: '80%' }
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
