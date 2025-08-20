import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

export default function CommunityProfilePicture({ comunidade }) {
  return (
    <Container maxWidth='lg'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1, sm: 2 }
        }}>
        <Avatar
          src={comunidade?.logo_url}
          alt={`Logo da ${comunidade?.nome}`}
          sx={{
            width: {
              xs: 120,
              sm: 150,
              md: 180,
              lg: 200
            },
            height: {
              xs: 120,
              sm: 150,
              md: 180,
              lg: 200
            },
            flexShrink: 0,
            border: '3px solid',
            borderColor: 'divider',
            boxShadow: 2,
            bgcolor: comunidade?.logo_url ? 'transparent' : 'primary.main',
            color: comunidade?.logo_url ? 'inherit' : 'primary.contrastText',
            fontSize: {
              xs: '3rem',
              sm: '3.5rem',
              md: '4rem',
              lg: '4.5rem'
            },
            fontWeight: 600
          }}>
          {comunidade?.nome?.charAt(0)?.toUpperCase()}
        </Avatar>

        <Box
          sx={{
            flex: 1,
            textAlign: { xs: 'center', md: 'left' },
            minWidth: 0,
            maxWidth: { xs: '100%', md: 'calc(100% - 220px)' }
          }}>
          <Typography
            variant='h3'
            component='h1'
            sx={{
              fontSize: {
                xs: '1.75rem',
                sm: '2.125rem',
                md: '2.5rem',
                lg: '3rem'
              },
              fontWeight: 700,
              mb: 1,
              wordBreak: 'break-word',
              lineHeight: 1.2
            }}>
            {comunidade?.nome}
          </Typography>

          {comunidade?.descricao && (
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' },
                lineHeight: 1.6,
                maxWidth: { xs: '100%', md: '600px' },
                wordBreak: 'break-word'
              }}>
              {comunidade.descricao}
            </Typography>
          )}

          {(comunidade?.link_website || comunidade?.link_instagram || comunidade?.link_linkedin || comunidade?.link_github) && (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                mt: 2,
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}></Box>
          )}
        </Box>
      </Box>
    </Container>
  )
}
