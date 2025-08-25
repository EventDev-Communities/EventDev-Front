import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LinkIcon from '@mui/icons-material/Link'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import { useState } from 'react'

export default function CardEvent({ evento, isOwner = false, onEdit, onDelete }) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  if (!evento || !evento.comunidade) return null

  const handleDeleteClick = () => {
    setConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    setConfirmOpen(false)
    onDelete()
  }

  const handleCancelDelete = () => {
    setConfirmOpen(false)
  }

  return (
    <Card sx={{ boxSizing: 'border-box', borderRadius: 2, width: '100%' }}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, padding: 1 }}>
          <Avatar
            alt={`Logo ${evento.comunidade.nome}`}
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
        <Box sx={{ position: 'relative', width: '100%', height: '320px', margin: 'auto' }}>
          <CardMedia
            component='img'
            image={evento.capa_url}
            alt={`Capa do evento ${evento.titulo}`}
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
            }}
          />
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
          {isOwner && (
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button
                size='small'
                startIcon={<EditIcon />}
                onClick={onEdit}
                sx={{
                  'minWidth': 0,
                  'px': '0 !important',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    boxShadow: 'none'
                  }
                }}
                aria-label='Editar evento'></Button>
              <Button
                color='error'
                size='small'
                startIcon={<DeleteIcon />}
                onClick={handleDeleteClick}
                sx={{
                  'minWidth': 0,
                  'px': '0 !important',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    boxShadow: 'none'
                  }
                }}
                aria-label='Excluir evento'></Button>
            </Box>
          )}
        </CardContent>
      </Box>
      <Dialog
        open={confirmOpen}
        onClose={handleCancelDelete}>
        <DialogTitle>Excluir evento</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza que deseja excluir este evento?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelDelete}
            variant='outlined'>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color='error'
            variant='contained'>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}
