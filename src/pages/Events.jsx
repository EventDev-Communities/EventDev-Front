import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Searchbar from '@/shared/components/Searchbar'
import EventTypeSelector from '@/shared/components/EventType'
import CardEventGroup from '@/shared/components/CardEvent/CardEventGroup'
import Box from '@mui/material/Box'
import React, { useState, useEffect } from 'react'
import CalendarView from '@/shared/components/CalendarView'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import { getEventos } from '../api/eventos'
import CircularProgress from '@mui/material/CircularProgress'

export default function Events() {
  const [view, setView] = useState('grid')
  const [page, setPage] = useState(1)
  const [eventType, setEventType] = useState('todos')
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)

  const eventosPorPagina = 8

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const data = await getEventos()
        setEventos(data)
      } catch (error) {
        console.error('Erro ao buscar eventos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEventos()
  }, [])

  const eventosFiltrados = eventos.filter((evento) => {
    if (eventType === 'todos') return true
    if (eventType === 'online') return evento.modalidade === 'online'
    if (eventType === 'presencial') return evento.modalidade === 'presencial'
    if (eventType === 'híbrido') return evento.modalidade === 'híbrido'
  })

  const totalPaginas = Math.ceil(eventosFiltrados.length / eventosPorPagina)

  const eventosPaginados = eventosFiltrados.slice((page - 1) * eventosPorPagina, page * eventosPorPagina)

  const handleChangePage = (_event, value) => {
    setPage(value)
  }

  React.useEffect(() => {
    setPage(1)
  }, [eventType])

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
    <Box>
      <Container
        sx={{ paddingTop: '4.5rem', paddingBottom: '4.5rem' }}
        maxWidth='xl'>
        <Typography
          variant='h3'
          component='h1'
          gutterBottom
          sx={{ fontWeight: 'semibold', mt: 3 }}>
          Eventos
        </Typography>
        <Typography
          variant='body1'
          color='text.secondary'
          sx={{ marginBottom: '1rem' }}>
          Encontre eventos de tecnologia em todo o Nordeste, presencial e online. Filtre por tipo e data.
        </Typography>

        <Searchbar
          view={view}
          setView={setView}
          placeholderText={'Buscar eventos...'}
        />

        <Box sx={{ mb: 2 }}>
          <EventTypeSelector
            value={eventType}
            onChange={setEventType}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Stack
            direction={{ xs: 'column', md: 'column', lg: 'row' }}
            spacing={2}
            sx={{ width: '100%' }}>
            <Box sx={{ flexGrow: 1 }}>
              {view === 'calendar' ? (
                <CalendarView eventType={eventType} />
              ) : (
                <>
                  <CardEventGroup eventos={eventosPaginados} />
                  {totalPaginas > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                      <Pagination
                        count={totalPaginas}
                        page={page}
                        onChange={handleChangePage}
                      />
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
