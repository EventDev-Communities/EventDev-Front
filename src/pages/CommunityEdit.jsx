import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Snackbar from '@mui/material/Snackbar'

import LogoPreviewCard from '@/shared/components/LogoPreviewCard'
import UploadImg from '@/shared/components/UploadImg'
import { getComunidadeById, updateComunidade } from '@/api/comunidades'

const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/

const communitySchema = z.object({
  nomeComunidade: z.string().min(1, 'Nome da comunidade é obrigatório'),
  email: z.string().email('E-mail inválido'),
  descricao: z.string().optional(),
  telefone: z.string().optional(),
  website: z.string().regex(urlRegex, 'URL inválida. Use formato: https://exemplo.com').optional().or(z.literal('')),
  instagram: z.string().regex(urlRegex, 'URL inválida. Use formato: https://exemplo.com').optional().or(z.literal('')),
  linkedin: z.string().regex(urlRegex, 'URL inválida. Use formato: https://exemplo.com').optional().or(z.literal('')),
  github: z.string().regex(urlRegex, 'URL inválida. Use formato: https://exemplo.com').optional().or(z.literal(''))
})

export default function CommunityEdit() {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [submitError, setSubmitError] = useState('')
  const [, setSubmitSuccess] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [showErrorToast, setShowErrorToast] = useState(false)
  const [comunidade, setComunidade] = useState(null)

  const navigate = useNavigate()
  const { communityId } = useParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(communitySchema)
  })

  useEffect(() => {
    const fetchComunidade = async () => {
      try {
        setIsLoading(true)
        setSubmitError('')

        if (!communityId) {
          setSubmitError('ID da comunidade não fornecido')
          return
        }

        const comunidadeData = await getComunidadeById(communityId)

        if (!comunidadeData) {
          setSubmitError('Comunidade não encontrada')
          return
        }

        setComunidade(comunidadeData)

        reset({
          nomeComunidade: comunidadeData.nome || '',
          email: comunidadeData.email || '',
          descricao: comunidadeData.descricao || '',
          telefone: comunidadeData.telefone || '',
          website: comunidadeData.link_website || '',
          instagram: comunidadeData.link_instagram || '',
          linkedin: comunidadeData.link_linkedin || '',
          github: comunidadeData.link_github || ''
        })

        if (comunidadeData.logo_url) {
          setUploadedImage(comunidadeData.logo_url)
        }
      } catch (fetchError) {
        setSubmitError(`Erro ao carregar dados da comunidade: ${fetchError.message}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComunidade()
  }, [communityId, reset])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitError('')
    setSubmitSuccess(false)

    try {
      const dadosComunidade = {
        nome: data.nomeComunidade,
        email: data.email,
        descricao: data.descricao || '',
        telefone: data.telefone || '',
        link_website: data.website || '',
        link_instagram: data.instagram || '',
        link_linkedin: data.linkedin || '',
        link_github: data.github || '',
        logo_url: uploadedImage || ''
      }

      await updateComunidade(communityId, dadosComunidade)

      setSubmitSuccess(true)
      setShowSuccessToast(true)

      setTimeout(() => {
        navigate(`/meu-perfil/${comunidade.slug}`)
      }, 2000)
    } catch (updateError) {
      setSubmitError(`Erro ao atualizar comunidade: ${updateError.message}`)
      setShowErrorToast(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData)
  }

  if (isLoading) {
    return (
      <Container maxWidth='xl'>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
            paddingTop: '4.5rem'
          }}>
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (submitError && !comunidade) {
    return (
      <Container maxWidth='xl'>
        <Box sx={{ paddingTop: '4.5rem', marginTop: '2rem' }}>
          <Alert severity='error'>{submitError}</Alert>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth='xl'>
      <Box sx={{ paddingTop: '4.5rem', marginTop: '2rem' }}>
        <Typography
          variant='h2'
          component='h2'>
          Editar Comunidade
        </Typography>

        <Typography
          variant='body1'
          component='p'
          sx={{ color: '#64748B', marginTop: '1rem' }}>
          Atualize as informações da sua comunidade
        </Typography>
      </Box>

      <Snackbar
        open={showSuccessToast}
        autoHideDuration={3000}
        onClose={() => setShowSuccessToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={() => setShowSuccessToast(false)}
          severity='success'
          sx={{ width: '100%' }}>
          Comunidade editada com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar
        open={showErrorToast}
        autoHideDuration={4000}
        onClose={() => setShowErrorToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={() => setShowErrorToast(false)}
          severity='error'
          sx={{ width: '100%' }}>
          {submitError || 'Erro ao editar comunidade.'}
        </Alert>
      </Snackbar>

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

          <Box sx={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography
                component='label'
                htmlFor='email'
                variant='subtitle1'
                fontWeight='bold'
                sx={{ marginBottom: '0.5rem', display: 'block' }}>
                E-mail
              </Typography>

              <TextField
                required
                id='email'
                placeholder='ex: contato@comunidade.dev'
                autoComplete='email'
                type='email'
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ width: '100%' }}
              />

              <Typography
                variant='caption'
                sx={{ marginTop: '0.5rem', color: 'text.secondary' }}>
                Email para login e contato
              </Typography>
            </Box>

            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography
                component='label'
                htmlFor='telefone'
                variant='subtitle1'
                fontWeight='bold'
                sx={{ marginBottom: '0.5rem', display: 'block' }}>
                Telefone
              </Typography>

              <TextField
                id='telefone'
                type='tel'
                placeholder='(85) 99999-9999'
                {...register('telefone')}
                error={!!errors.telefone}
                helperText={errors.telefone?.message}
                sx={{ width: '100%' }}
              />

              <Typography
                variant='caption'
                sx={{ marginTop: '0.5rem', color: 'text.secondary' }}>
                Telefone para contato
              </Typography>
            </Box>
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

          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Button
              variant='outlined'
              onClick={() => navigate(-1)}
              disabled={isSubmitting}>
              Cancelar
            </Button>

            <Button
              type='submit'
              variant='contained'
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}>
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </Box>
        </Box>

        <LogoPreviewCard imageData={uploadedImage} />
      </Box>
    </Container>
  )
}
