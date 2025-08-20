import { useState } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'

export default function UploadImg({ onImageUpload }) {
  const [logoUrl, setLogoUrl] = useState('')
  const [fileName, setFileName] = useState(null)
  const [urlError, setUrlError] = useState('')

  const validateUrl = (url) => {
    if (!url) return ''

    const urlPattern = new RegExp('^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$')

    if (!urlPattern.test(url)) {
      return 'URL inválida. Use formato: https://exemplo.com'
    }

    return ''
  }

  const handleFileChange = (event) => {
    const inputId = event.target.getAttribute('id')

    if (inputId === 'fileUpload') {
      const file = event.target.files[0]
      if (file) {
        setFileName(file.name)
        setLogoUrl('')
        setUrlError('')

        onImageUpload({
          file: file,
          url: URL.createObjectURL(file),
          name: file.name,
          size: file.size
        })
      }
      return
    }

    if (inputId === 'urlUpload') {
      const url = event.target.value
      setLogoUrl(url)

      const error = validateUrl(url)
      setUrlError(error)

      if (url && !error) {
        setFileName(null)
        onImageUpload({
          url: url,
          name: url
        })
      } else if (!url) {
        onImageUpload(null)
      }
    }
  }

  return (
    <Box sx={{ flex: 1, maxWidth: '100%' }}>
      <Typography
        variant='subtitle1'
        fontWeight='bold'
        sx={{ marginBottom: '0.5rem' }}>
        Logo da Comunidade
      </Typography>

      <Box
        component='label'
        htmlFor='fileUpload'
        sx={{
          border: '2px dashed #F87171',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          cursor: 'pointer',
          color: '#64748B',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 150,
          boxSizing: 'border-box',
          width: '100%'
        }}>
        <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />
        <Typography>Clique para enviar uma imagem</Typography>
        <Typography variant='caption'>PNG, JPG ou JPEG (máx. 5MB)</Typography>
        <input
          id='fileUpload'
          type='file'
          accept='image/png, image/jpeg'
          hidden
          value=''
          onChange={handleFileChange}
        />
      </Box>

      {fileName && (
        <Typography
          variant='body2'
          sx={{ mt: 1 }}>
          Arquivo selecionado: <strong>{fileName}</strong>
        </Typography>
      )}

      <Divider sx={{ my: 3 }}>ou</Divider>

      <TextField
        id='urlUpload'
        fullWidth
        placeholder='https://exemplo.com/logo.png'
        value={logoUrl}
        onChange={handleFileChange}
        error={!!urlError}
        helperText={urlError}
      />

      <Typography
        variant='caption'
        sx={{ mt: 1, display: 'block', color: 'text.secondary' }}>
        Você pode fornecer uma imagem do computador ou fornecer uma URL
      </Typography>
    </Box>
  )
}
