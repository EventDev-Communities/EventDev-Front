import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import HeroSection from '@/shared/components/HeroSection'
import CallToAction from '@/shared/components/CallToAction'
import SectionHeader from '@/shared/components/SectionHeader'
import EventViewToggle from '@/shared/components/EventViewToggle'
import CardEventGroup from '@/shared/components/CardEvent/CardEventGroup'
import FeaturedCardGroup from '@/shared/components/FeaturedCard/FeaturedCardGroup'
import { useContext, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { getCommunities } from '../api/community'
import { getEvents } from '../api/event'
import { AuthContext } from '../shared/providers/AuthContext'

export default function Home() {
  const { user } = useContext(AuthContext)
  const [eventType, setEventType] = useState('todos')

  const {
    data: comunidades,
    isLoading: isLoadingComunidades,
    error: errorComunidades
  } = useQuery({
    queryKey: ['comunidades'],
    queryFn: getCommunities
  })

  const {
    data: eventos,
    isLoading: isLoadingEventos,
    error: errorEventos
  } = useQuery({
    queryKey: ['eventos'],
    queryFn: getEvents
  })

  const isLoading = isLoadingComunidades || isLoadingEventos
  const error = errorComunidades || errorEventos

  const sortedFutureEvents = useMemo(() => {
    if (!eventos) return []

    const now = new Date()

    return eventos
      .filter((evento) => {
        const start = new Date(evento.data_hora_inicial)
        if (isNaN(start) || start < now) return false // ignora inválidos e passados

        if (eventType === 'online') {
          return evento.modalidade === 'online' || evento.modalidade === 'híbrido'
        }

        return true
      })
      .sort((a, b) => {
        return new Date(a.data_hora_inicial) - new Date(b.data_hora_inicial)
      })
  }, [eventos, eventType])

  if (isLoading) {
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

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'white'
        }}>
        <Typography
          variant='h6'
          color='error'>
          An error has occurred: {error.message}
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ paddingTop: '4.5rem' }}>
      <HeroSection comunidadeId={user?.comunidade_id} />
      <Container maxWidth='xl'>
        <SectionHeader
          title='Eventos em Destaque'
          subtitle='Descubra os próximos eventos das comunidades.'
          link='/eventos'
          linkText='Ver todos os eventos'
        />
        <EventViewToggle
          eventType={eventType}
          setEventType={setEventType}
        />
        <CardEventGroup eventos={sortedFutureEvents?.slice(0, 4)} />
        <SectionHeader
          title='Comunidades em Destaque'
          subtitle='Conheça as comunidades dev mais ativas da plataforma'
          link='/comunidades'
          linkText='Ver todas as Comunidades'
        />
        <FeaturedCardGroup comunidades={comunidades} />
      </Container>
      <CallToAction
        title='Crie seu próprio evento'
        subtitles={['Tem uma ideia para um evento na sua comunidade dev?', 'Crie e compartilhe agora mesmo!']}
        buttonText='Começar agora'
        link='/eventos'
      />
    </Box>
  )
}
