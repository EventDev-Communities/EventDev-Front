import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

export default function DeleteCommunityDialog({ open, onClose, onConfirm, communityName, isDeleting = false }) {
  const [confirmationText, setConfirmationText] = useState('')
  const [error, setError] = useState('')

  const handleConfirm = () => {
    if (confirmationText !== communityName) {
      setError('O nome da comunidade não confere. Digite exatamente como mostrado.')
      return
    }

    setError('')
    onConfirm()
  }

  const handleClose = () => {
    if (isDeleting) return
    setConfirmationText('')
    setError('')
    onClose()
  }

  const isConfirmDisabled = confirmationText !== communityName || isDeleting

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='sm'
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2
        }
      }}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 1, mb: 1 }}>
        <Typography
          variant='h5'
          component='span'>
          Excluir Comunidade
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Alert
          severity='error'
          sx={{ mb: 3 }}>
          <Typography
            variant='body2'
            sx={{ fontWeight: 600 }}>
            Esta ação é irreversível!
          </Typography>
          <Typography
            variant='body2'
            sx={{ mt: 1 }}>
            Todos os dados da comunidade, incluindo eventos e informações, serão permanentemente excluídos.
          </Typography>
        </Alert>

        <Typography
          variant='body1'
          sx={{ mb: 2 }}>
          Para confirmar a exclusão, digite o nome da comunidade:
        </Typography>

        <Typography
          variant='body2'
          sx={{
            fontWeight: 600,
            bgcolor: 'grey.100',
            p: 1,
            borderRadius: 1,
            mb: 2,
            fontFamily: 'monospace'
          }}>
          {communityName}
        </Typography>

        <TextField
          fullWidth
          placeholder='Digite o nome da comunidade'
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
          error={!!error}
          helperText={error}
          disabled={isDeleting}
          autoFocus
          sx={{ mb: 2 }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={handleClose}
          disabled={isDeleting}
          variant='outlined'>
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={isConfirmDisabled}
          variant='contained'
          color='error'
          startIcon={isDeleting ? <CircularProgress size={16} /> : null}>
          {isDeleting ? 'Excluindo...' : 'Excluir Comunidade'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
