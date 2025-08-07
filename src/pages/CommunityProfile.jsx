import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AboutCommunity from '@/shared/components/AboutCommunity'
import CardEvent from '@/shared/components/CardEvent'
import CommunityProfilePicture from '@/shared/components/CommunityProfilePicture'
import ToogleCommunityProfile from '@/shared/components/ToggleCommunityProfile'

import { getComunidadeBySlug } from '../api/comunidades'
import CircularProgress from '@mui/material/CircularProgress'
import { getEventos } from '../api/eventos'

function CommunityProfile() {
  const { communitySlug } = useParams()
  const [eventType, setEventType] = useState('eventos')
  const [comunidade, setComunidade] = useState(null)
  const [eventosDaComunidade, setEventosDaComunidade] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const comunidadeData = await getComunidadeBySlug(communitySlug)
        setComunidade(comunidadeData)

        const allEventos = await getEventos()
        const eventosDaComunidade = allEventos.filter((evento) => evento.comunidade && evento.comunidade.id === comunidadeData.id)
        setEventosDaComunidade(eventosDaComunidade)
      } catch (error) {
        console.error('Erro ao buscar comunidade e eventos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [communitySlug])

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

  if (!comunidade) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Comunidade não encontrada.</Typography>
      </Box>
    )
  }

  const filteredEventos = eventosDaComunidade.filter((evento) => {
    if (eventType === 'todos' || eventType === 'eventos') return true
    if (eventType === 'online') return evento.online === true
    if (eventType === 'presencial') return evento.online === false
    return true
  })

  return (
    <Container
      maxWidth='xl'
      sx={{ paddingTop: '4.5rem', marginTop: '2rem' }}>
      <CommunityProfilePicture comunidade={comunidade} />

      <ToogleCommunityProfile
        value={eventType}
        onChange={setEventType}
      />

      {eventType === 'eventos' && (
        <Typography
          variant='h5'
          sx={{ mt: 4 }}>
          Eventos da Comunidade
        </Typography>
      )}

      <Box mt={4}>
        {eventType === 'sobre' ? (
          <AboutCommunity comunidade={comunidade} />
        ) : filteredEventos.length > 0 ? (
          filteredEventos.map((evento) => (
            <CardEvent
              key={evento.id}
              evento={evento}
            />
          ))
        ) : (
          <Typography color='text.secondary'>Não existe nenhum evento agendado para essa comunidade.</Typography>
        )}
      </Box>
    </Container>
  )
}

export default CommunityProfile
