import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import EventCountBadge from '@/shared/components/EventCountBadge'
import CardEventHorizontal from '../CardEvent/CardEventHorizontal'

export default function SelectedDatePanel({ selectedDate, eventos = [] }) {
  const formatDate = (dateStr) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' }
    return new Date(dateStr).toLocaleDateString('pt-BR', options)
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1, sm: 2, md: 3 },
        borderRadius: 2,
        minHeight: 240,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        border: '1px solid #E8E8E8'
      }}>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'>
        <Typography
          variant='subtitle1'
          fontWeight={500}>
          {formatDate(selectedDate)}
        </Typography>
        <EventCountBadge count={eventos.length} />
      </Box>
      <Box
        flexGrow={1}
        mt={4}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'>
        {eventos.length === 0 ? (
          <Stack
            alignItems='center'
            spacing={1}>
            <EventAvailableIcon
              color='action'
              fontSize='large'
            />
            <Typography
              variant='subtitle1'
              fontWeight={600}>
              Nenhum evento nesta data
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'>
              Experimente selecionar outra data no calendário.
            </Typography>
          </Stack>
        ) : (
          <Box sx={{ width: '100%' }}>
            <CardEventHorizontal eventos={eventos} />
          </Box>
        )}
      </Box>
    </Paper>
  )
}
