'use client'

import { useForm } from 'react-hook-form'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import TipCard from '@/shared/components/TipCard'
import BannerImg from '@/shared/components/UploadBanner'

export default function CreateEvent() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    return { formData: data }
  }

  return (
    <Container maxWidth='xl'>
      <Box sx={{ paddingTop: '4.5rem', mt: '2rem' }}>
        <Typography
          variant='h2'
          component='h2'>
          Criar novo evento
        </Typography>
        <Typography
          variant='body1'
          component='p'
          sx={{ color: '#64748B', mt: '1rem' }}>
          Compartilhe conhecimento e conecte-se com a comunidade criando seu próprio evento.
        </Typography>
      </Box>

      <Box
        component='form'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', mt: '2rem' }}>
        <Box sx={{ flex: 1, maxWidth: '100%', minWidth: 300 }}>
          {/* Event Title */}
          <Box sx={{ display: 'flex', flexDirection: 'column', mb: '2rem' }}>
            <Typography
              component='label'
              htmlFor='nomeEvento'
              variant='subtitle1'
              fontWeight='bold'
              sx={{ mb: '0.5rem' }}>
              Título do Evento
            </Typography>
            <TextField
              required
              id='nomeEvento'
              placeholder='Workshop React: construindo aplicações modernas'
              {...register('nomeComunidade', { required: 'O título do Evento é Obrigatório' })}
              error={!!errors.nomeComunidade}
              helperText={errors.nomeComunidade?.message}
              sx={{ width: '100%' }}
            />
            <Typography
              variant='caption'
              sx={{ mt: '0.5rem', color: 'text.secondary' }}>
              Um título claro e atrativo para seu evento.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: '2rem', mb: '2rem', flexWrap: 'wrap' }}></Box>

          {/* Description */}
          <Box sx={{ display: 'flex', flexDirection: 'column', mb: '2rem' }}>
            <Typography
              component='label'
              htmlFor='descricaoComunidade'
              variant='subtitle1'
              fontWeight='bold'
              sx={{ mb: '0.5rem' }}>
              Descrição
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
              sx={{ mt: '0.5rem', color: 'text.secondary' }}>
              Descreva seu evento em detalhes para atrair o público certo
            </Typography>
          </Box>

          <BannerImg />

          <Box sx={{ paddingTop: '2rem' }}>
            <Box sx={{ display: 'flex', gap: '2rem', mb: '2rem', flexWrap: 'wrap', mt: '2rem' }}>
              <Box sx={{ flex: 1, minWidth: 200 }}>
                {/* Date */}
                <Typography
                  component='label'
                  variant='subtitle1'
                  fontWeight='bold'
                  sx={{ mb: '0.5rem', display: 'block' }}>
                  Data do Evento
                </Typography>
                <TextField
                  id='data'
                  placeholder='Selecione uma data'
                  type='date'
                  {...register('data')}
                  sx={{ width: '100%' }}
                />
                <Typography
                  variant='caption'
                  sx={{ mt: '0.5rem', color: 'text.secondary' }}>
                  A data em que o evento ocorrerá
                </Typography>
              </Box>
              {/* Event Timepicker */}
              <Box sx={{ flex: 1, minWidth: 200 }}>
                <Typography
                  component='label'
                  variant='subtitle1'
                  fontWeight='bold'
                  sx={{ mb: '0.5rem', display: 'block' }}>
                  Horário Inicial
                </Typography>
                <TextField
                  id='horarioInicial'
                  type='time'
                  {...register('linkedin')}
                  sx={{ width: '100%' }}
                />
                <Typography
                  variant='caption'
                  sx={{ mt: '0.5rem', color: 'text.secondary' }}>
                  Horário que começa seu evento
                </Typography>
              </Box>
              {/* Event End-Time */}
              <Box sx={{ flex: 1, minWidth: 200 }}>
                <Typography
                  component='label'
                  variant='subtitle1'
                  fontWeight='bold'
                  sx={{ mb: '0.5rem', display: 'block' }}>
                  Horário Final
                </Typography>
                <TextField
                  id='horarioInicial'
                  type='time'
                  placeholder='00:00'
                  {...register('linkedin')}
                  sx={{ width: '100%' }}
                />
                <Typography
                  variant='caption'
                  sx={{ mt: '0.5rem', color: 'text.secondary' }}>
                  Horário que termina seu evento
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: '3rem', mb: '2rem', flexWrap: 'wrap' }}>
              <Box sx={{ flex: 1, minWidth: 200 }}>
                <Typography
                  component='label'
                  variant='subtitle1'
                  fontWeight='bold'
                  sx={{ mb: '0.5rem', display: 'block' }}>
                  Evento Online
                </Typography>
                <Typography
                  variant='caption'
                  sx={{ mt: '0.5rem', color: 'text.secondary' }}>
                  Marque esta opção se o evento será realizado online
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: '3rem', mb: '2rem', flexWrap: 'wrap' }}>
              <Box sx={{ flex: 1, minWidth: 200 }}>
                <Typography
                  component='label'
                  variant='subtitle1'
                  fontWeight='bold'
                  sx={{ mb: '0.5rem', display: 'block' }}>
                  Endereço
                </Typography>
                <TextField
                  id='endereco'
                  placeholder='Av. Exemplo, 123'
                  type='url'
                  {...register('endereco')}
                  sx={{ width: '100%' }}
                />
                <Typography
                  variant='caption'
                  sx={{ mt: '0.5rem', color: 'text.secondary' }}>
                  Endereço físico onde o evento ocorrerá
                </Typography>
              </Box>

              <Box sx={{ flex: 1, minWidth: 200 }}>
                <Typography
                  component='label'
                  htmlFor='github'
                  variant='subtitle1'
                  fontWeight='bold'
                  sx={{ mb: '0.5rem', display: 'block' }}>
                  Cidade
                </Typography>
                <TextField
                  id='cidade'
                  placeholder='ex: Fortaleza'
                  {...register('cidade')}
                  sx={{ width: '100%' }}
                />
                <Typography
                  variant='caption'
                  sx={{ mt: '0.5rem', color: 'text.secondary' }}>
                  Cidade onde o evento será realizado
                </Typography>
              </Box>
            </Box>
          </Box>

          <Button
            type='submit'
            variant='contained'>
            Criar Evento
          </Button>
        </Box>

        <TipCard />
      </Box>
    </Container>
  )
}
