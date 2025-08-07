import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import GitHubIcon from '@mui/icons-material/GitHub'
import InstagramIcon from '@mui/icons-material/Instagram'
import LanguageIcon from '@mui/icons-material/Language'
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'

export default function CommunityProfilePicture({ comunidade }) {
  return (
    <Stack
      direction='row'
      spacing={2}
      alignItems='center'
      sx={{
        py: 2,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'center', sm: 'flex-start' }
      }}>
      <Box
        sx={{
          width: 160,
          height: 160,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid #eee'
        }}>
        <img
          src={comunidade.logo_url}
          alt={comunidade.nome}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 1 }}>
        <Typography
          variant='h1'
          sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          {comunidade.nome}
        </Typography>

        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          {comunidade.descricao}
        </Typography>

        <Stack
          direction='row'
          spacing={1}
          mt={1}
          sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}>
          {comunidade.github_url && (
            <Link
              href={comunidade.github_url}
              target='_blank'
              rel='noopener'>
              <IconButton
                aria-label='GitHub'
                size='small'>
                <GitHubIcon fontSize='small' />
              </IconButton>
            </Link>
          )}
          {comunidade.instagram_url && (
            <Link
              href={comunidade.instagram_url}
              target='_blank'
              rel='noopener'>
              <IconButton
                aria-label='Instagram'
                size='small'>
                <InstagramIcon fontSize='small' />
              </IconButton>
            </Link>
          )}
          {comunidade.site_url && (
            <Link
              href={comunidade.site_url}
              target='_blank'
              rel='noopener'>
              <IconButton
                aria-label='Website'
                size='small'>
                <LanguageIcon fontSize='small' />
              </IconButton>
            </Link>
          )}
        </Stack>
      </Box>
    </Stack>
  )
}
