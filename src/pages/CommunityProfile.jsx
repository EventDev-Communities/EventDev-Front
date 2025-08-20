import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

import AboutCommunity from '@/shared/components/AboutCommunity'
import CardEvent from '@/shared/components/CardEvent'
import CommunityProfilePicture from '@/shared/components/CommunityProfilePicture'
import ToogleCommunityProfile from '@/shared/components/ToggleCommunityProfile'
import DeleteCommunityDialog from '@/shared/components/DeleteCommunityDialog'

import { getComunidadeBySlug, deleteComunidade } from '@/api/comunidades'
import { getEventos } from '@/api/eventos'

export default function CommunityProfile({ isOwner = false }) {
  const { communitySlug } = useParams()
  const [eventType, setEventType] = useState('eventos')
  const [comunidade, setComunidade] = useState(null)
  const [eventosDaComunidade, setEventosDaComunidade] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' })

  const navigate = useNavigate()

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

  const handleEditCommunity = () => {
    if (comunidade?.id) {
      navigate(`/editar-comunidade/${comunidade.id}`)
    }
  }

  const handleCreateEvent = () => {
    navigate('/criacao-de-eventos')
  }

  const handleDeleteCommunity = async () => {
    setIsDeleting(true)

    try {
      await deleteComunidade(comunidade.id)

      setToast({
        open: true,
        message: 'Comunidade excluída com sucesso!',
        severity: 'success'
      })

      setTimeout(() => {
        navigate('/comunidades')
      }, 2000)
    } catch (error) {
      setToast({
        open: true,
        message: 'Erro ao excluir comunidade. Tente novamente.',
        error,
        severity: 'error'
      })
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
    }
  }

  const handleCloseToast = () => {
    setToast({ ...toast, open: false })
  }

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

      {isOwner && (
        <Box sx={{ display: 'flex', justifyContent: 'start', mb: 1, mt: 2 }}>
          <ButtonGroup
            sx={{
              'borderRadius': '8px',
              '& .MuiButton-root': {
                px: 3,
                py: 1,
                fontWeight: 500,
                fontSize: '12px',
                textTransform: 'none',
                minHeight: '40px'
              },
              '& .MuiButton-root:first-of-type': {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0
              },
              '& .MuiButton-root:last-of-type': {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0
              }
            }}>
            <Button
              variant='outlined'
              startIcon={<EditIcon />}
              onClick={handleEditCommunity}>
              Editar
            </Button>
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              onClick={handleCreateEvent}>
              Novo Evento
            </Button>
          </ButtonGroup>
        </Box>
      )}

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

      {isOwner && (
        <Box sx={{ mt: 6, py: 4, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography
            variant='h6'
            sx={{ mb: 2, color: 'error.main' }}>
            Zona de Perigo
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ mb: 3 }}>
            Esta ação é irreversível. Todos os dados da comunidade serão permanentemente excluídos.
          </Typography>
          <Button
            variant='outlined'
            color='error'
            startIcon={<DeleteIcon />}
            onClick={() => setDeleteDialogOpen(true)}>
            Excluir Comunidade
          </Button>
        </Box>
      )}

      <DeleteCommunityDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteCommunity}
        communityName={comunidade?.nome}
        isDeleting={isDeleting}
      />

      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}
