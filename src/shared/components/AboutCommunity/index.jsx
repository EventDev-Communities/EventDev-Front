import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import LanguageIcon from '@mui/icons-material/Language'
import GitHubIcon from '@mui/icons-material/GitHub'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

export default function AboutCommunity({ comunidade }) {
  if (!comunidade) {
    return (
      <Box sx={{ borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography
          variant='body1'
          color='text.secondary'>
          Comunidade não encontrada
        </Typography>
      </Box>
    )
  }

  const renderSocialLink = (url, icon) => {
    if (!url) return null

    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '24px 1fr',
          alignItems: 'center',
          columnGap: 2,
          wordBreak: 'break-word'
        }}>
        {icon}
        <Link
          href={url}
          target='_blank'
          rel='noopener'
          underline='hover'
          sx={{
            wordBreak: 'break-word',
            maxWidth: 'calc(100% - 24px)',
            whiteSpace: 'normal'
          }}>
          {url}
        </Link>
      </Box>
    )
  }

  // Normalizar dados da comunidade
  const descricao = comunidade.descricao?.trim() || 'Descrição não disponível'
  const hasLinks = comunidade.link_website || comunidade.link_github || comunidade.link_instagram || comunidade.link_linkedin

  return (
    <Box sx={{ borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography
        variant='h5'
        gutterBottom
        fontWeight='bold'>
        Sobre a comunidade
      </Typography>
      <Typography
        variant='body1'
        color='text.secondary'>
        {descricao}
      </Typography>

      {hasLinks && (
        <>
          <Typography
            variant='h5'
            gutterBottom
            fontWeight='bold'
            sx={{ mt: 4 }}>
            Canais oficiais
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexWrap: 'wrap' }}>
            {renderSocialLink(
              comunidade.link_website,
              <LanguageIcon
                fontSize='small'
                color='action'
              />,
              'Website'
            )}
            {renderSocialLink(
              comunidade.link_github,
              <GitHubIcon
                fontSize='small'
                color='action'
              />,
              'GitHub'
            )}
            {renderSocialLink(
              comunidade.link_instagram,
              <InstagramIcon
                fontSize='small'
                color='action'
              />,
              'Instagram'
            )}
            {renderSocialLink(
              comunidade.link_linkedin,
              <LinkedInIcon
                fontSize='small'
                color='action'
              />,
              'LinkedIn'
            )}
          </Box>
        </>
      )}
    </Box>
  )
}
