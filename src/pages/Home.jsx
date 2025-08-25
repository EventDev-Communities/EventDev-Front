import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import HeroSection from '@/shared/components/HeroSection'
import CallToAction from '@/shared/components/CallToAction'
import SectionHeader from '@/shared/components/SectionHeader'
import EventViewToggle from '@/shared/components/EventViewToggle'
import CardEventGroup from '@/shared/components/CardEvent/CardEventGroup'
import FeaturedCardGroup from '@/shared/components/FeaturedCard/FeaturedCardGroup'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getEventos } from '../api/eventos'
import { getComunidades } from '../api/comunidades'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

export default function Home() {
  const [eventType, setEventType] = useState('todos')

  const {
    data: comunidades,
    isLoading: isLoadingComunidades,
    error: errorComunidades
  } = useQuery({
    queryKey: ['comunidades'],
    queryFn: getComunidades
  })

  const {
    data: eventos,
    isLoading: isLoadingEventos,
    error: errorEventos
  } = useQuery({
    queryKey: ['eventos'],
    queryFn: getEventos
  })

  const isLoading = isLoadingComunidades || isLoadingEventos
  const error = errorComunidades || errorEventos

  const filteredEventos = eventos?.filter((evento) => {
    if (eventType === 'todos') return true
    if (eventType === 'online') return evento.modalidade === 'online'
    return true
  })

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
      <HeroSection />
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
        <CardEventGroup eventos={filteredEventos?.slice(0, 4)} />
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
