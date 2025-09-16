import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import LanguageIcon from '@mui/icons-material/Language'
import GitHubIcon from '@mui/icons-material/GitHub'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import PhoneIcon from '@mui/icons-material/Phone'

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

  const renderPhone = (phone) => {
    if (!phone) return null

    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '24px 1fr',
          alignItems: 'center',
          columnGap: 2,
          wordBreak: 'break-word'
        }}>
        <PhoneIcon
          fontSize='small'
          color='action'
        />
        <Typography sx={{ wordBreak: 'break-word' }}>{phone}</Typography>
      </Box>
    )
  }

  const description = comunidade.description?.trim() || 'Descrição não disponível'
  const hasLinks =
    comunidade.link_website || comunidade.link_github || comunidade.link_instagram || comunidade.link_linkedin || comunidade.phone_number

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
        {description}
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
            {renderPhone(comunidade.phone_number)}
            {renderSocialLink(
              comunidade.link_website,
              <LanguageIcon
                fontSize='small'
                color='action'
              />
            )}
            {renderSocialLink(
              comunidade.link_github,
              <GitHubIcon
                fontSize='small'
                color='action'
              />
            )}
            {renderSocialLink(
              comunidade.link_instagram,
              <InstagramIcon
                fontSize='small'
                color='action'
              />
            )}
            {renderSocialLink(
              comunidade.link_linkedin,
              <LinkedInIcon
                fontSize='small'
                color='action'
              />
            )}
          </Box>
        </>
      )}
    </Box>
  )
}
