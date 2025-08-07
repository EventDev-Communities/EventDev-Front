import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import Link from '@mui/material/Link'
import { useNavigate } from 'react-router-dom'

export default function FeaturedCard({ comunidade }) {
  const navigate = useNavigate()

  const handleLinkClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/perfil-comunidade/${comunidade.slug}`)
  }

  return (
    <Card
      onClick={handleLinkClick}
      sx={{
        width: { xs: '100%', sm: '49%', md: '32%', lg: '23.5%' },
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'space-between'
      }}>
      <CardActionArea
        sx={{
          paddingTop: '3rem',
          paddingBottom: '2rem',
          paddingX: { xs: '10%', sm: '20%', md: '5%', lg: '7.5%' },
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
        <CardMedia
          component='img'
          image={comunidade.logo_url}
          alt={`Logo da comunidade ${comunidade.nome}`}
          sx={{
            height: '100px',
            width: '100px',
            borderRadius: '50%',
            display: 'flex',
            justifySelf: 'center',
            margin: '0 auto'
          }}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant='h5'
            paddingBottom='20px'>
            {comunidade.nome}
          </Typography>

          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
            {comunidade.descricao}
          </Typography>
        </CardContent>

        <Link
          fontWeight={700}
          underline='hover'
          variant='caption'
          href={`/perfil-comunidade/${comunidade.slug}`}
          onClick={handleLinkClick}
          sx={{ marginTop: 'auto' }}>
          Ver perfil
        </Link>
      </CardActionArea>
    </Card>
  )
}
