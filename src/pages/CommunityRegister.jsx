'use client'

import { useForm } from 'react-hook-form'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import UploadImg from '@/shared/components/UploadImg'

import LogoPreviewCard from '@/shared/components/LogoPreviewCard'
import { useState } from 'react'

export default function CommunityRegister() {
  const [uploadedImage, setUploadedImage] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    return { formData: data }
  }

  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData)
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
          Cadastre sua comunidade para poder compartilhar seus eventos com o público
        </Typography>
      </Box>

      <Box
        component='form'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '2rem' }}>
        <Box sx={{ flex: 1, maxWidth: '100%', minWidth: 300 }}>
          {/* Nome da Comunidade */}
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
              {...register('nomeComunidade', { required: 'Nome da comunidade é obrigatório' })}
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

          {/* Email e Senha */}
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
                {...register('email', { required: 'E-mail é obrigatório' })}
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
                htmlFor='senha'
                variant='subtitle1'
                fontWeight='bold'
                sx={{ marginBottom: '0.5rem', display: 'block' }}>
                Senha
              </Typography>

              <TextField
                required
                id='senha'
                type='password'
                placeholder='********'
                autoComplete='current-password'
                {...register('senha', {
                  required: 'Senha é obrigatória',
                  minLength: { value: 6, message: 'Mínimo de 6 caracteres' }
                })}
                error={!!errors.senha}
                helperText={errors.senha?.message}
                sx={{ width: '100%' }}
              />

              <Typography
                variant='caption'
                sx={{ marginTop: '0.5rem', color: 'text.secondary' }}>
                Mínimo de 6 caracteres
              </Typography>
            </Box>
          </Box>

          {/* Descrição da Comunidade */}
          <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}>
            <Typography
              component='label'
              htmlFor='descricaoComunidade'
              variant='subtitle1'
              fontWeight='bold'
              sx={{ marginBottom: '0.5rem' }}>
              Descrição da Comunidade
            </Typography>

            <TextField
              id='descricaoComunidade'
              placeholder='Descreva o propósito da sua comunidade...'
              name='descricaoComunidade'
              type='text'
              multiline
              minRows={5}
              {...register('descricaoComunidade')}
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
            sx={{
              marginTop: '1rem'
            }}
            type='submit'
            variant='contained'>
            Cadastrar Comunidade
          </Button>
        </Box>

        <LogoPreviewCard imageData={uploadedImage} />
      </Box>
    </Container>
  )
}
