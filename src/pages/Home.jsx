import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import HeroSection from '@/shared/components/HeroSection'
import CallToAction from '@/shared/components/CallToAction'
import SectionHeader from '@/shared/components/SectionHeader'
import EventViewToggle from '@/shared/components/EventViewToggle'
import CardEventGroup from '@/shared/components/CardEvent/CardEventGroup'
import FeaturedCardGroup from '@/shared/components/FeaturedCard/FeaturedCardGroup'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getEventos } from '../api/eventos'
import CircularProgress from '@mui/material/CircularProgress'

export default function Home() {
  const [comunidades, setComunidades] = useState([])
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)
  const [eventType, setEventType] = useState('todos')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [comunidadesRes, eventosData] = await Promise.all([axios.get('http://localhost:4000/comunidades'), getEventos()])

        setComunidades(comunidadesRes.data)
        setEventos(eventosData)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredEventos = eventos.filter((evento) => {
    if (eventType === 'todos') return true
    if (eventType === 'online') return evento.online === true
    if (eventType === 'presencial') return evento.online === false
    return true
  })

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
        <CardEventGroup eventos={filteredEventos.slice(0, 4)} />
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
