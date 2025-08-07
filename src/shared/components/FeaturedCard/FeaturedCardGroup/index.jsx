import Box from '@mui/material/Box'
import FeaturedCard from '@/shared/components/FeaturedCard'

export default function FeaturedCardGroup({ comunidades }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '1.5rem',
        rowGap: { xs: '10px', sm: '10px' },
        columnGap: { sm: '10px', md: '10px' },
        justifyContent: { sm: 'stretch', md: 'center' }
      }}>
      {comunidades.map((comunidade) => (
        <FeaturedCard
          key={comunidade.id}
          comunidade={comunidade}
        />
      ))}
    </Box>
  )
}
