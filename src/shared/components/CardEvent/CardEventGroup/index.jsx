import Box from '@mui/material/Box'

import CardEvent from '@/shared/components/CardEvent'

export default function CardEventGroup({ eventos }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        rowGap: '1rem',
        columnGap: '1rem',
        marginBottom: '2rem',
        flexDirection: { xs: 'row', lg: 'row' },
        justifyContent: {
          xs: 'center',
          sm: 'center',
          md: 'space-around',
          lg: 'space-between'
        },
        gap: '1rem'
      }}>
      {eventos && eventos.length > 0 ? (
        eventos.map((evento) => (
          <CardEvent
            key={evento.id}
            evento={evento}
          />
        ))
      ) : (
        <p>Sem eventos para mostrar</p>
      )}
    </Box>
  )
}
