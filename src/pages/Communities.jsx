import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Searchbar from '@/shared/components/Searchbar'
import FeaturedCardGroup from '@/shared/components/FeaturedCard/FeaturedCardGroup'
import Pagination from '@mui/material/Pagination'
import Box from '@mui/material/Box'
import { useState, useEffect } from 'react'
import { getComunidades } from '../api/comunidades'
import CircularProgress from '@mui/material/CircularProgress'

export default function Communities() {
  const [comunidades, setComunidades] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const groupsPerPage = 8

  useEffect(() => {
    const fetchComunidades = async () => {
      try {
        const result = await getComunidades()
        setComunidades(result)
      } catch (error) {
        console.error('Erro ao buscar comunidades:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchComunidades()
  }, [])

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

  const startIndex = (page - 1) * groupsPerPage
  const endIndex = startIndex + groupsPerPage
  const comunidadesToShow = comunidades.slice(startIndex, endIndex)

  const pageCount = Math.ceil(comunidades.length / groupsPerPage)

  const handleChangePage = (_event, value) => {
    setPage(value)
  }

  return (
    <Container
      maxWidth='xl'
      sx={{ paddingTop: '4.5rem' }}>
      <Typography
        component='div'
        maxWidth='xl'>
        <Typography
          variant='h3'
          component='h1'
          gutterBottom
          sx={{ fontWeight: 'semibold' }}>
          Comunidades
        </Typography>

        <Typography
          variant='body1'
          color='text.secondary'
          sx={{ marginBottom: '1rem' }}>
          Encontre comunidades de desenvolvedores para participar de eventos e discussões.
        </Typography>
      </Typography>

      <Searchbar
        showToggle={false}
        placeholderText='Buscar comunidade...'
        filterOptions={[
          { value: 'recent', label: 'Mais recentes' },
          { value: 'popular', label: 'Mais populares' },
          { value: 'alphabetical', label: 'Ordem alfabética' }
        ]}
      />

      <FeaturedCardGroup comunidades={comunidadesToShow} />

      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      )}
    </Container>
  )
}
