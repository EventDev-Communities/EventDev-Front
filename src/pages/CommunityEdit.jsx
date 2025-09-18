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
import { getCommunityById, updateCommunity } from '../api/community'

const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/

const communitySchema = z.object({
  nome: z.string().min(1, 'Nome da comunidade é obrigatório'),
  descricao: z.string().optional(),
  telefone: z.string().optional(),
  link_website: z.string().regex(urlRegex, 'URL inválida. Use formato: https://exemplo.com').optional().or(z.literal('')),
  link_instagram: z.string().regex(urlRegex, 'URL inválida. Use formato: https://exemplo.com').optional().or(z.literal('')),
  link_linkedin: z.string().regex(urlRegex, 'URL inválida. Use formato: https://exemplo.com').optional().or(z.literal('')),
  link_github: z.string().regex(urlRegex, 'URL inválida. Use formato: https://exemplo.com').optional().or(z.literal('')),
  logo_url: z.string().optional().or(z.literal(''))
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
    resolver: zodResolver(communitySchema),
    defaultValues: {}
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

        const comunidadeData = await getCommunityById(communityId)

        if (!comunidadeData) {
          setSubmitError('Comunidade não encontrada')
          return
        }

        setComunidade(comunidadeData)

        reset({
          nome: comunidadeData.nome || comunidadeData.name || '',
          descricao: comunidadeData.descricao || comunidadeData.description || '',
          telefone: comunidadeData.telefone || comunidadeData.phone || '',
          link_website: comunidadeData.link_website || '',
          link_instagram: comunidadeData.link_instagram || '',
          link_linkedin: comunidadeData.link_linkedin || '',
          link_github: comunidadeData.link_github || ''
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
      const dataCommunity = {
        ...data,
        logo_url: uploadedImage || comunidade.logo_url || ''
      }

      await updateCommunity(communityId, dataCommunity)

      setSubmitSuccess(true)
      setShowSuccessToast(true)

      setTimeout(() => {
        navigate(`/meu-perfil/${comunidade.id}`)
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
          {/* Campos do formulário */}
          <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}>
            <Typography
              component='label'
              htmlFor='nome'
              variant='subtitle1'
              fontWeight='bold'
              sx={{ marginBottom: '0.5rem' }}>
              Nome da Comunidade
            </Typography>
            <TextField
              required
              id='nome'
              placeholder='ex: React Nordeste'
              type='text'
              {...register('nome')}
              error={!!errors.nome}
              helperText={errors.nome?.message}
              sx={{ width: '100%' }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}>
            <TextField
              id='telefone'
              label='Telefone'
              type='tel'
              placeholder='(85) 99999-9999'
              {...register('telefone')}
              error={!!errors.telefone}
              helperText={errors.telefone?.message}
              sx={{ flex: 1, minWidth: 200 }}
            />
          </Box>

          <TextField
            id='descricao'
            label='Descrição da Comunidade'
            placeholder='Descreva o propósito da sua comunidade...'
            multiline
            minRows={5}
            {...register('descricao')}
            error={!!errors.descricao}
            helperText={errors.descricao?.message}
            sx={{ width: '100%', marginBottom: '2rem' }}
          />

          <UploadImg onImageUpload={handleImageUpload} />

          {/* Links sociais */}
          <Box sx={{ paddingTop: '2rem' }}>
            <Typography
              variant='h2'
              component='h2'>
              Links Sociais (Opcionais)
            </Typography>
            <Box sx={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <TextField
                id='link_instagram'
                label='Instagram'
                placeholder='https://instagram.com/sua-comunidade'
                {...register('link_instagram')}
                error={!!errors.link_instagram}
                helperText={errors.link_instagram?.message}
                sx={{ flex: 1, minWidth: 200 }}
              />
              <TextField
                id='link_linkedin'
                label='LinkedIn'
                placeholder='https://linkedin.com/in/sua-comunidade'
                {...register('link_linkedin')}
                error={!!errors.link_linkedin}
                helperText={errors.link_linkedin?.message}
                sx={{ flex: 1, minWidth: 200 }}
              />
              <TextField
                id='link_website'
                label='Website'
                placeholder='https://seusite.com.br'
                {...register('link_website')}
                error={!!errors.link_website}
                helperText={errors.link_website?.message}
                sx={{ flex: 1, minWidth: 200 }}
              />
              <TextField
                id='link_github'
                label='GitHub'
                placeholder='https://github.com/sua-comunidade'
                {...register('link_github')}
                error={!!errors.link_github}
                helperText={errors.link_github?.message}
                sx={{ flex: 1, minWidth: 200 }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
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
