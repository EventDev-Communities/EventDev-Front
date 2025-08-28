import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LinkIcon from '@mui/icons-material/Link'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'

import { getEventos } from '@/api/eventos'
import Chip from '@mui/material/Chip'

export default function CardEventHorizontal({ eventos: eventosProp, selectedDate }) {
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEventos() {
      if (eventosProp) {
        setEventos(eventosProp)
        setLoading(false)
        return
      }
      try {
        const eventosData = await getEventos()
        if (selectedDate) {
          // Filtra eventos do dia selecionado
          const eventosDoDia = eventosData.filter(
            (ev) => new Date(ev.data_hora_inicial).toISOString().slice(0, 10) === new Date(selectedDate).toISOString().slice(0, 10)
          )
          setEventos(eventosDoDia)
        } else {
          setEventos(eventosData)
        }
      } catch (error) {
        console.error('Erro ao buscar eventos:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEventos()
  }, [eventosProp, selectedDate])

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

  if (!eventos.length) {
    return (
      <Card sx={{ borderRadius: 2, width: '100%', p: 2 }}>
        <Typography variant='body1'>Nenhum evento encontrado.</Typography>
      </Card>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {eventos.map((evento) => (
        <Card
          key={evento.id}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid #E5E7EB',
            boxSizing: 'border-box',
            width: '100%',
            margin: '0 auto'
          }}>
          <CardMedia
            component='img'
            image={evento.capa_url}
            alt={`Capa do evento ${evento.titulo}`}
            sx={{
              width: { xs: '100%', sm: 200 },
              margin: { xs: '0 auto', sm: '0' },
              height: 220,
              objectFit: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              borderBottomLeftRadius: { xs: 0, sm: 8 }
            }}
          />
          <CardActionArea
            sx={{
              flex: 1,
              height: 'auto',
              borderTopRightRadius: 2,
              borderBottomRightRadius: 2,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 2,
              padding: 2
            }}>
            <CardContent sx={{ paddingRight: 0, paddingLeft: 1, paddingTop: 0, paddingBottom: 0 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, mt: 1 }}>
                  <Avatar
                    alt={`Logo ${evento.comunidade?.nome || ''}`}
                    src={evento.comunidade?.logo_url || ''}
                    sx={{ width: 32, height: 32 }}
                  />
                  <Typography
                    variant='subtitle1'
                    sx={{ fontWeight: 500 }}>
                    {evento.comunidade?.nome || 'Comunidade'}
                  </Typography>
                </Box>
                <Box>
                  <Chip
                    label={
                      evento.modalidade === 'online'
                        ? 'Online'
                        : evento.modalidade === 'presencial'
                          ? 'Presencial'
                          : evento.modalidade === 'híbrido'
                            ? 'Híbrido'
                            : ''
                    }
                    color={
                      evento.modalidade === 'online'
                        ? 'primary'
                        : evento.modalidade === 'presencial'
                          ? 'success'
                          : evento.modalidade === 'hibrido'
                            ? 'secondary'
                            : ''
                    }
                    size='small'
                    sx={{ fontSize: '0.7rem', height: 22, paddingX: 0, fontWeight: 600 }}
                  />
                </Box>
              </Box>

              <Typography
                variant='body1'
                component='div'
                sx={{ mb: 1, fontWeight: 600 }}>
                {evento.titulo}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarTodayIcon sx={{ color: '#64748B' }} />
                  <Typography
                    variant='body2'
                    sx={{ color: '#64748B' }}>
                    {evento.data_hora_inicial ? new Date(evento.data_hora_inicial).toLocaleDateString('pt-BR') : ''}
                  </Typography>
                </Box>
                {evento.modalidade !== 'online' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PlaceOutlinedIcon sx={{ color: '#64748B' }} />
                    <Typography
                      variant='body2'
                      sx={{ color: '#64748B' }}>
                      {['presencial', 'híbrido'].includes(evento.modalidade) &&
                        (!evento.endereco ? 'Endereço Pendente' : `${evento.endereco.rua}, ${evento.endereco.numero} - ${evento.endereco.bairro}`)}
                    </Typography>
                  </Box>
                )}
                {evento.link && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinkIcon sx={{ color: '#64748B' }} />
                    <Link
                      href={evento.link}
                      underline='hover'
                      target='_blank'
                      rel='noopener'
                      sx={{ color: 'primary.main', textDecoration: 'none' }}>
                      Link do evento
                    </Link>
                  </Box>
                )}
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  )
}
