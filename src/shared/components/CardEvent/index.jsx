import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LinkIcon from '@mui/icons-material/Link'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'

export default function CardEvent({ evento }) {
  if (!evento || !evento.comunidade) return null

  return (
    <Card
      sx={{
        boxSizing: 'border-box',
        borderRadius: 2,
        width: '100%',
        maxWidth: {
          xs: '100%',
          sm: '40%',
          md: '22%'
        }
      }}>
      <CardActionArea>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, padding: 1 }}>
          <Avatar
            alt='Logo Front-End CE'
            src={evento.comunidade.logo_url}
          />
          <Typography
            gutterBottom
            variant='h5'
            sx={{ margin: 0 }}
            component='div'>
            {evento.comunidade.nome}
          </Typography>
        </Box>
        <Box sx={{ position: 'relative', width: '294.75px', height: '320px', margin: 'auto' }}>
          <CardMedia
            component='img'
            image={evento.capa_url}
            alt='Evento React'
            sx={{
              width: '100%',
              height: '320px',
              objectFit: 'cover',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <Box
            sx={{
              px: 2,
              top: 0,
              left: 0,
              width: '100%',
              color: '#fff',
              height: '100%',
              display: 'flex',
              textAlign: 'center',
              position: 'absolute',
              alignItems: 'flex-end',
              justifyContent: 'left',
              bgcolor: 'rgba(0, 0, 0, 0.118)'
            }}></Box>
        </Box>
        <CardContent>
          <Typography
            variant='h5'
            component='div'
            color='black'
            sx={{ paddingY: 0.2, textAlign: 'center', fontSize: '18px' }}>
            {evento.titulo}
          </Typography>
          <Typography
            variant='body2'
            sx={{ color: 'text.secondary', borderTop: '1px solid #e0e0e0', marginTop: 1, py: 2 }}>
            {evento.descricao}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarTodayIcon sx={{ color: '#64748B' }} />
              <Typography
                variant='body2'
                sx={{ color: '#64748B' }}>
                {evento.data_Hora_inicial}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PlaceOutlinedIcon sx={{ color: '#64748B' }} />
              <Typography
                variant='body2'
                sx={{ color: '#64748B' }}>
                {evento.endereco}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LinkIcon sx={{ color: '#64748B' }} />
              <Link
                href={evento.link}
                underline='hover'
                target='_blank'
                rel='noopener'
                sx={{ color: 'primary.main', textDecoration: 'none' }}>
                Acesse o link do evento
              </Link>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
