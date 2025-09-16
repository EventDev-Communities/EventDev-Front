import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import LogoPreviewCard from '@/shared/components/LogoPreviewCard'
import UploadImg from '@/shared/components/UploadImg'
import Snackbar from '@mui/material/Snackbar'
import { createCommunity } from '../api/community'
import { AuthContext } from '../shared/providers/AuthContext'

const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/

const communitySchema = z.object({
  nomeComunidade: z.string().min(1, 'Nome da comunidade é obrigatório'),
  descricao: z.string().optional(),
  telefone: z.string().optional(),
  website: z.string().regex(urlRegex, 'URL inválida. Use formato: https://exemplo.com').optional().or(z.literal('')),
  instagram: z.string().regex(urlRegex, 'URL inválida. Use formato: https://exemplo.com').optional().or(z.literal('')),
  linkedin: z.string().regex(urlRegex, 'URL inválida. Use formato: https://exemplo.com').optional().or(z.literal('')),
  github: z.string().regex(urlRegex, 'URL inválida. Use formato: https://exemplo.com').optional().or(z.literal(''))
})

export default function CommunityRegister() {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  const navigate = useNavigate()
  const { isAuthenticated, user, loading } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(communitySchema)
  })

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        console.error('Usuário não está autenticado - redirecionando para login')
        setSubmitError('Você precisa estar logado para cadastrar uma comunidade.')
        setTimeout(() => navigate('/login'), 2000)
        return
      }

      if (user && !user.roles?.includes('community')) {
        console.error('Usuário não tem role community:', user.roles, '- redirecionando para home')
        setSubmitError('Apenas usuários de comunidade podem cadastrar comunidades.')
        setTimeout(() => navigate('/'), 2000)
        return
      }
    }
  }, [isAuthenticated, user, loading, navigate])

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <Container
        maxWidth='xl'
        sx={{ display: 'flex', justifyContent: 'center', paddingTop: '4.5rem' }}>
        <CircularProgress />
      </Container>
    )
  }

  // Não renderizar o formulário se não estiver autenticado
  if (!isAuthenticated || (user && !user.roles?.includes('community'))) {
    return (
      <Container maxWidth='xl'>
        <Box sx={{ paddingTop: '4.5rem', marginTop: '2rem', textAlign: 'center' }}>
          <Alert
            severity='warning'
            sx={{ maxWidth: 600, margin: '0 auto' }}>
            {!isAuthenticated
              ? 'Você precisa estar logado para cadastrar uma comunidade.'
              : 'Apenas usuários de comunidade podem cadastrar comunidades.'}
          </Alert>
        </Box>
      </Container>
    )
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitError('')
    setSubmitSuccess(false)

    try {
      if (!isAuthenticated) {
        console.error('Usuário não está autenticado')
        setSubmitError('Sessão expirada. Faça login novamente.')
        navigate('/login')
        return
      }

      if (!user) {
        console.error('Dados do usuário não encontrados')
        setSubmitError('Erro ao carregar dados do usuário. Tente fazer login novamente.')
        navigate('/login')
        return
      }

      if (!user.roles?.includes('community')) {
        console.error('Usuário não tem role community:', user.roles)
        setSubmitError('Apenas usuários de comunidade podem cadastrar comunidades.')
        return
      }

      const dadosComunidade = {
        nome: data.nomeComunidade,
        description: data.descricao || '',
        telefone: data.telefone || '',
        link_website: data.website || '',
        link_instagram: data.instagram || '',
        link_linkedin: data.linkedin || '',
        link_github: data.github || ''
      }

      console.warn('uploadedImage:', uploadedImage, 'tipo:', typeof uploadedImage)

      if (uploadedImage) {
        if (typeof uploadedImage === 'object' && uploadedImage.url) {
          dadosComunidade.logo_url = uploadedImage.url
          console.warn('logo_url adicionado (objeto):', uploadedImage.url)
        } else if (typeof uploadedImage === 'string' && uploadedImage.trim() !== '') {
          dadosComunidade.logo_url = uploadedImage
          console.warn('logo_url adicionado (string):', uploadedImage)
        }
      }

      console.warn('Chamando createCommunity com:', dadosComunidade)
      const comunidadeCriada = await createCommunity(dadosComunidade)
      console.warn('Comunidade criada:', comunidadeCriada)

      setSubmitSuccess(true)
      setShowSuccessToast(true)
      reset()
      setUploadedImage(null)

      setTimeout(() => {
        navigate(`/meu-perfil/${comunidadeCriada.slug || comunidadeCriada.id}`)
      }, 2000)
    } catch (error) {
      console.error('Erro capturado:', error)

      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        setSubmitError('Sessão expirada. Faça login novamente.')
        navigate('/login')
      } else {
        setSubmitError('Erro ao cadastrar comunidade. Tente novamente.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (imageData) => {
    if (imageData) {
      if (typeof imageData === 'object' && imageData.url) {
        setUploadedImage(imageData.url)
      } else if (typeof imageData === 'string') {
        setUploadedImage(imageData)
      }
    } else {
      setUploadedImage(null)
    }
  }

  return (
    <Container maxWidth='xl'>
      <Box sx={{ paddingTop: '4.5rem', marginTop: '2rem' }}>
        <Typography
          variant='h2'
          component='h2'>
          Cadastro de Comunidade
        </Typography>

        <Typography
          variant='body1'
          component='p'
          sx={{ color: '#64748B', marginTop: '1rem' }}>
          Cadastre sua comunidade para poder compartilhar seus eventos com o público. Você precisa estar logado como usuário de comunidade para
          cadastrar uma nova comunidade.
        </Typography>
      </Box>

      {submitError && (
        <Snackbar
          open={showSuccessToast}
          autoHideDuration={3000}
          onClose={() => setShowSuccessToast(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert
            severity='error'
            sx={{ mt: 2 }}>
            {submitError}
          </Alert>
        </Snackbar>
      )}

      {submitSuccess && (
        <Snackbar
          open={showSuccessToast}
          autoHideDuration={3000}
          onClose={() => setShowSuccessToast(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert
            onClose={() => setShowSuccessToast(false)}
            severity='success'
            sx={{ width: '100%' }}>
            Comunidade criada com sucesso!
          </Alert>
        </Snackbar>
      )}

      <Box
        component='form'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '2rem' }}>
        <Box sx={{ flex: 1, maxWidth: '100%', minWidth: 300 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}>
            <Typography
              component='label'
              htmlFor='nomeComunidade'
              variant='subtitle1'
              fontWeight='bold'
              sx={{ marginBottom: '0.5rem' }}>
              Nome da Comunidade
            </Typography>

            <TextField
              required
              id='nomeComunidade'
              placeholder='ex: React Nordeste'
              type='text'
              {...register('nomeComunidade')}
              error={!!errors.nomeComunidade}
              helperText={errors.nomeComunidade?.message}
              sx={{ width: '100%' }}
            />

            <Typography
              variant='caption'
              sx={{ marginTop: '0.5rem', color: 'text.secondary' }}>
              Nome pelo qual sua comunidade é conhecida.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}>
            <Typography
              component='label'
              htmlFor='telefone'
              variant='subtitle1'
              fontWeight='bold'
              sx={{ marginBottom: '0.5rem' }}>
              Telefone:
            </Typography>
            <TextField
              id='telefone'
              type='tel'
              placeholder='(85) 99999-9999'
              {...register('telefone')}
              error={!!errors.telefone}
              helperText={errors.telefone?.message}
              sx={{ flex: 1, minWidth: 200 }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}>
            <Typography
              component='label'
              htmlFor='descricao'
              variant='subtitle1'
              fontWeight='bold'
              sx={{ marginBottom: '0.5rem' }}>
              Descrição da Comunidade
            </Typography>

            <TextField
              id='descricao'
              placeholder='Descreva o propósito da sua comunidade...'
              multiline
              minRows={5}
              {...register('descricao')}
              error={!!errors.descricao}
              helperText={errors.descricao?.message}
              sx={{ width: '100%' }}
            />

            <Typography
              variant='caption'
              sx={{ marginTop: '0.5rem', color: 'text.secondary' }}>
              Uma descrição clara ajudará as pessoas a entenderem a sua comunidade.
            </Typography>
          </Box>

          <UploadImg onImageUpload={handleImageUpload} />

          <Box sx={{ paddingTop: '2rem' }}>
            <Typography
              variant='h2'
              component='h2'>
              Links Sociais (Opcionais)
            </Typography>

            <Box sx={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <Box sx={{ flex: 1, minWidth: 200 }}>
                <Typography
                  component='label'
                  htmlFor='instagram'
                  variant='subtitle1'
                  fontWeight='bold'
                  sx={{ marginBottom: '0.5rem', display: 'block' }}>
                  Instagram
                </Typography>

                <TextField
                  id='instagram'
                  placeholder='https://instagram.com/sua-comunidade'
                  type='url'
                  {...register('instagram')}
                  error={!!errors.instagram}
                  helperText={errors.instagram?.message}
                  sx={{ width: '100%' }}
                />

                <Typography
                  variant='caption'
                  sx={{ marginTop: '0.5rem', color: 'text.secondary' }}>
                  Link para o perfil do Instagram
                </Typography>
              </Box>

              <Box sx={{ flex: 1, minWidth: 200 }}>
                <Typography
                  component='label'
                  htmlFor='linkedin'
                  variant='subtitle1'
                  fontWeight='bold'
                  sx={{ marginBottom: '0.5rem', display: 'block' }}>
                  LinkedIn
                </Typography>

                <TextField
                  id='linkedin'
                  placeholder='https://linkedin.com/in/sua-comunidade'
                  type='url'
                  {...register('linkedin')}
                  error={!!errors.linkedin}
                  helperText={errors.linkedin?.message}
                  sx={{ width: '100%' }}
                />

                <Typography
                  variant='caption'
                  sx={{ marginTop: '0.5rem', color: 'text.secondary' }}>
                  Link para o perfil do LinkedIn
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <Box sx={{ flex: 1, minWidth: 200 }}>
                <Typography
                  component='label'
                  htmlFor='website'
                  variant='subtitle1'
                  fontWeight='bold'
                  sx={{ marginBottom: '0.5rem', display: 'block' }}>
                  Website
                </Typography>

                <TextField
                  id='website'
                  placeholder='https://seusite.com.br'
                  type='url'
                  {...register('website')}
                  error={!!errors.website}
                  helperText={errors.website?.message}
                  sx={{ width: '100%' }}
                />

                <Typography
                  variant='caption'
                  sx={{ marginTop: '0.5rem', color: 'text.secondary' }}>
                  Link do site oficial da comunidade
                </Typography>
              </Box>

              <Box sx={{ flex: 1, minWidth: 200 }}>
                <Typography
                  component='label'
                  htmlFor='github'
                  variant='subtitle1'
                  fontWeight='bold'
                  sx={{ marginBottom: '0.5rem', display: 'block' }}>
                  GitHub
                </Typography>

                <TextField
                  id='github'
                  placeholder='https://github.com/sua-comunidade'
                  type='url'
                  {...register('github')}
                  error={!!errors.github}
                  helperText={errors.github?.message}
                  sx={{ width: '100%' }}
                />

                <Typography
                  variant='caption'
                  sx={{ marginTop: '0.5rem', color: 'text.secondary' }}>
                  Link para o repositório ou perfil da comunidade no GitHub
                </Typography>
              </Box>
            </Box>
          </Box>

          <Button
            sx={{ marginTop: '1rem' }}
            type='submit'
            variant='contained'
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}>
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Comunidade'}
          </Button>
        </Box>

        <LogoPreviewCard imageData={uploadedImage} />
      </Box>
    </Container>
  )
}
