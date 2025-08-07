import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

export default function BannerImg() {
  const [logoUrl, setLogoUrl] = useState('')
  const [fileName, setFileName] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setFileName(file.name)
      setLogoUrl('')
    }
  }

  return (
    <Box sx={{ flex: 1, maxWidth: '100%' }}>
      <Typography
        variant='subtitle1'
        fontWeight='bold'
        sx={{ marginBottom: '0.5rem' }}>
        Imagem da Capa
      </Typography>

      {/* Área de upload */}
      <Box
        component='label'
        htmlFor='logoUpload'
        sx={{
          border: '2px dashed #F87171',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          cursor: 'pointer',
          color: '#64748B',
          display: 'flex', // flex para controle do conteúdo
          flexDirection: 'column', // empilhar verticalmente
          alignItems: 'center', // centralizar horizontalmente
          justifyContent: 'center', // centralizar verticalmente
          minHeight: 150, // altura mínima para garantir espaço
          boxSizing: 'border-box', // para o padding contar dentro da box
          width: '100%'
        }}>
        <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />
        <Typography>Clique para enviar uma imagem</Typography>
        <Typography variant='caption'>PNG, JPG ou JPEG (máx. 5MB)</Typography>
        <input
          type='file'
          id='logoUpload'
          accept='image/png, image/jpeg'
          hidden
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

      {/* Separador "ou" */}
      <Divider sx={{ my: 3 }}>ou</Divider>

      {/* Campo para URL da imagem */}
      <TextField
        fullWidth
        placeholder='https://exemplo.com/capa.png'
        value={logoUrl}
        onChange={(e) => {
          setLogoUrl(e.target.value)
          setFileName(null)
        }}
      />

      {/* Nota explicativa */}
      <Typography
        variant='caption'
        sx={{ mt: 1, display: 'block', color: 'text.secondary' }}>
        Uma imagem atrativa para seu evento (formatos recomendados: jpg, png). Recomendamos usar imagens com tamanho e proporção semelhantes aos posts
        do Instagram para melhor visualização.
      </Typography>
    </Box>
  )
}
