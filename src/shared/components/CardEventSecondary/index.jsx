import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LinkIcon from '@mui/icons-material/Link'
import PlaceIcon from '@mui/icons-material/Place'

import profile from '@/shared/assets/static/images/front-end-ce.png'

import imagePHP from '@/shared/assets/static/images/MeetuPHP_com_Rapadura.png'
import imagePython from '@/shared/assets/static/images/Python.png'
import imageReact from '@/shared/assets/static/images/React_Conf_Nordeste.png'

export function CardEventSecondaryGroup() {
  return (
    <Grid
      container
      spacing={4}
      justifyContent='space-between'
      sx={{
        mb: '5rem'
      }}>
      <Grid>
        <EventCard
          image={imageReact}
          title='React Conf Nordeste 2025'
          orgName='Frontend Ceará'
          orgLogo={profile}
          description='A maior conferência de React da América Latina. Palestras, workshops e muito networking'
          date='16/05/2025'
          location='Centro de Eventos - Avenida Washington Soares'
          link='https://www.ingressos.com'
        />
      </Grid>
      <Grid>
        <EventCard
          image={imagePython}
          title='Python Nordeste 2025'
          orgName='Python Nordeste'
          orgLogo={profile}
          description='Promover o aprendizado, o compartilhamento de conhecimento e o fortalecimento de laços aa aa aa aaaa aaaaa ...'
          date='20/06/2025 à 22/06/2025'
          location='Teresina - PI'
          link='https://www.even3.com.br/python-nordeste-2025/'
        />
      </Grid>
      <Grid>
        <EventCard
          image={imagePHP}
          title='React Conf Nordeste 2025'
          orgName='Frontend Ceará'
          orgLogo={profile}
          description='A maior conferência de React da América Latina. Palestras, workshops e muito networking.'
          date='16/05/2025'
          location='Centro de Eventos - Avenida Washington Soares'
          link='https://www.ingressos.com'
        />
      </Grid>
    </Grid>
  )
}

export default function CardEventSecondary(props) {
  const { image, title, orgName, orgLogo, description, date, location, link } = props
  return (
    <Card
      sx={{
        width: {
          xs: '100%',
          sm: '300px',
          md: '350px',
          lg: '360px',
          xl: '360px'
        },
        height: 520
      }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component='img'
          height='135'
          image={image}
          alt={title}
          sx={{
            objectFit: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        />
        <CardContent>
          <Typography
            variant='h6'
            sx={{
              position: 'absolute',
              left: 0,
              bottom: -15,
              color: '#323a45',
              backgroundColor: 'white',
              borderTopWidth: '1px',
              borderBottomWidth: '1px',
              borderLeftWidth: '0px',
              borderRightWidth: '1px',
              borderStyle: 'solid',
              borderColor: '#f2f2f2',
              padding: '8px 20px 8px 15px',
              borderRadius: '0 100px 100px 0 ',
              maxWidth: '90%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
            gutterBottom>
            {title}
          </Typography>
        </CardContent>
      </Box>
      <CardContent sx={{ mt: '0.25rem' }}>
        <Box
          display='flex'
          alignItems='center'
          gap={1}
          mb={2}>
          <Avatar
            alt={orgName}
            src={orgLogo}
            sx={{ width: 32, height: 32 }}
          />
          <Typography
            variant='body2'
            color='text.secondary'>
            {orgName}
          </Typography>
        </Box>

        <Typography
          variant='body2'
          height='3.5rem'
          fontSize='12.5px'
          color='#64748B'
          sx={{ pb: '4rem', borderBottom: '1px solid #f2f2f2' }}>
          {description}
        </Typography>

        <Stack
          spacing={1}
          mt='15px'>
          <Box
            display='flex'
            alignItems='center'
            gap={1}>
            <CalendarTodayIcon
              fontSize='inherit'
              sx={{ color: '#64748B' }}
            />
            <Typography
              variant='body2'
              fontSize='12px'
              color='#64748B'>
              {date}
            </Typography>
          </Box>
          <Box
            display='flex'
            alignItems='center'
            gap={1}>
            <PlaceIcon
              fontSize='inherit'
              sx={{ color: '#64748B' }}
            />
            <Typography
              variant='body2'
              fontSize='12px'
              color='#64748B'>
              {location}
            </Typography>
          </Box>
          <Box
            display='flex'
            alignItems='center'
            gap={1}>
            <LinkIcon
              fontSize='inherit'
              sx={{ color: '#64748B' }}
            />
            <Link
              href={link}
              target='_blank'
              rel='noopener'
              fontSize='12px'>
              Link / Ingressos
            </Link>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
