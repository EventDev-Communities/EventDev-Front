import Box from '@mui/material/Box'

import CardEvent from '@/shared/components/CardEvent'

export default function CardEventGroup({ eventos = [], eventosPaginados = [] }) {
  const paginados = Array.isArray(eventosPaginados) ? eventosPaginados : []
  const eventosParaRenderizar = eventos.length > 0 ? eventos : paginados

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: '1fr 1fr 1fr',
          lg: '1fr 1fr 1fr 1fr'
        },
        gap: '1.5rem',
        marginBottom: '2rem',
        justifyItems: 'center'
      }}>
      {eventosParaRenderizar.length > 0 ? (
        eventosParaRenderizar.map((evento) => (
          <CardEvent
            key={evento.id}
            evento={evento}
          />
        ))
      ) : (
        <Box sx={{ gridColumn: '1/-1', textAlign: 'center', py: 4 }}>Sem eventos para mostrar</Box>
      )}
    </Box>
  )
}
