import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import TipCard from '@/shared/components/TipCard'
import BannerImg from '@/shared/components/UploadBanner'
import { getEventos, updateEvento } from '@/api/eventos'

const today = new Date().toISOString().split('T')[0]

const eventSchema = z
  .object({
    nomeEvento: z.string().min(1, 'O título do Evento é obrigatório'),
    descricaoEvento: z.string().min(1, 'A descrição é obrigatória'),
    data: z.string().refine((val) => val >= today, { message: 'A data não pode ser anterior a hoje' }),
    horarioInicial: z.string().min(1, 'Horário inicial obrigatório'),
    horarioFinal: z.string().min(1, 'Horário final obrigatório'),
    modalidade: z.enum(['presencial', 'online', 'hibrido'], { errorMap: () => ({ message: 'Selecione a modalidade do evento' }) }),
    endereco: z.string().optional(),
    cidade: z.string().optional()
  })
  .refine((data) => !data.data || data.horarioFinal >= data.horarioInicial, {
    message: 'Horário final não pode ser antes do horário inicial',
    path: ['horarioFinal']
  })

export default function EditEvent() {
  const { eventoId } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const [bannerImage, setBannerImage] = useState('')
  const [evento, setEvento] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(eventSchema)
  })

  useEffect(() => {
    const fetchEvento = async () => {
      setIsLoading(true)
      setSubmitError('')
      try {
        const eventos = await getEventos()
        const eventoEncontrado = eventos.find((e) => String(e.id) === String(eventoId))
        if (!eventoEncontrado) {
          setSubmitError('Evento não encontrado')
          setIsLoading(false)
          return
        }
        setEvento(eventoEncontrado)
        setBannerImage(eventoEncontrado.capa_url || '')
        reset({
          nomeEvento: eventoEncontrado.titulo || '',
          descricaoEvento: eventoEncontrado.descricao || '',
          data: eventoEncontrado.data_Hora_inicial?.split('T')[0] || '',
          horarioInicial: eventoEncontrado.data_Hora_inicial?.split('T')[1] || '',
          horarioFinal: eventoEncontrado.data_Hora_final?.split('T')[1] || '',
          modalidade: eventoEncontrado.modalidade || '',
          endereco: eventoEncontrado.endereco || '',
          cidade: eventoEncontrado.cidade || ''
        })
      } catch (err) {
        setSubmitError('Erro ao carregar evento', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchEvento()
  }, [eventoId, reset])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitError('')
    try {
      const eventoAtualizado = {
        titulo: data.nomeEvento,
        descricao: data.descricaoEvento,
        data_Hora_inicial: `${data.data}T${data.horarioInicial}`,
        data_Hora_final: `${data.data}T${data.horarioFinal}`,
        modalidade: data.modalidade,
        endereco: data.endereco || '',
        cidade: data.cidade || '',
        capa_url: bannerImage || '',
        id_comunidade: evento?.id_comunidade
      }

      await updateEvento(eventoId, eventoAtualizado)
      setShowSuccessToast(true)
      setTimeout(() => {
        navigate(`/meu-perfil/${evento?.comunidade?.slug}`)
      }, 2000)
    } catch (err) {
      setSubmitError('Erro ao editar evento. Tente novamente.', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBannerUpload = (img) => {
    setBannerImage(img)
  }

  if (isLoading) {
    return (
      <Container maxWidth='xl'>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <Typography variant='h6'>Carregando evento...</Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth='xl'>
      <Box sx={{ paddingTop: '4.5rem', mt: '2rem' }}>
        <Typography
          variant='h2'
          component='h2'>
          Editar evento
        </Typography>
        <Typography
          variant='body1'
          component='p'
          sx={{ color: '#64748B', mt: '1rem' }}>
          Atualize as informações do seu evento
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
          Evento editado com sucesso!
        </Alert>
      </Snackbar>

      {submitError && (
        <Alert
          severity='error'
          sx={{ mt: 2 }}>
          {submitError}
        </Alert>
      )}

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
              {...register('nomeEvento')}
              error={!!errors.nomeEvento}
              helperText={errors.nomeEvento?.message}
              sx={{ width: '100%' }}
            />
            <Typography
              variant='caption'
              sx={{ mt: '0.5rem', color: 'text.secondary' }}>
              Um título claro e atrativo para seu evento.
            </Typography>
          </Box>

          {/* Description */}
          <Box sx={{ display: 'flex', flexDirection: 'column', mb: '2rem' }}>
            <Typography
              component='label'
              htmlFor='descricaoEvento'
              variant='subtitle1'
              fontWeight='bold'
              sx={{ mb: '0.5rem' }}>
              Descrição
            </Typography>
            <TextField
              id='descricaoEvento'
              placeholder='Faça uma breve descrição do seu evento...'
              name='descricaoEvento'
              type='text'
              multiline
              minRows={5}
              {...register('descricaoEvento')}
              error={!!errors.descricaoEvento}
              helperText={errors.descricaoEvento?.message}
              sx={{ width: '100%' }}
            />
            <Typography
              variant='caption'
              sx={{ mt: '0.5rem', color: 'text.secondary' }}>
              Descreva seu evento em detalhes para atrair o público certo
            </Typography>
          </Box>

          <BannerImg
            imageData={bannerImage}
            onImageUpload={handleBannerUpload}
          />

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
                  inputProps={{ min: today }}
                  {...register('data')}
                  error={!!errors.data}
                  helperText={errors.data?.message}
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
                  {...register('horarioInicial')}
                  error={!!errors.horarioInicial}
                  helperText={errors.horarioInicial?.message}
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
                  id='horarioFinal'
                  type='time'
                  placeholder='00:00'
                  {...register('horarioFinal')}
                  error={!!errors.horarioFinal}
                  helperText={errors.horarioFinal?.message}
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
                <FormControl
                  fullWidth
                  error={!!errors.modalidade}>
                  <InputLabel id='modalidade-label'>Modalidade do Evento</InputLabel>
                  <Select
                    labelId='modalidade-label'
                    id='modalidade'
                    defaultValue=''
                    label='Modalidade do Evento'
                    {...register('modalidade')}>
                    <MenuItem value='presencial'>Presencial</MenuItem>
                    <MenuItem value='online'>Online</MenuItem>
                    <MenuItem value='hibrido'>Híbrido</MenuItem>
                  </Select>
                </FormControl>
                <Typography
                  variant='caption'
                  sx={{ mt: '0.5rem', color: 'text.secondary' }}>
                  Selecione o tipo de modalidade do evento
                </Typography>
                {errors.modalidade && (
                  <Typography
                    variant='caption'
                    color='error.main'>
                    {errors.modalidade.message}
                  </Typography>
                )}
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
                  error={!!errors.endereco}
                  helperText={errors.endereco?.message}
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
                  htmlFor='cidade'
                  variant='subtitle1'
                  fontWeight='bold'
                  sx={{ mb: '0.5rem', display: 'block' }}>
                  Cidade
                </Typography>
                <TextField
                  id='cidade'
                  placeholder='ex: Fortaleza'
                  {...register('cidade')}
                  error={!!errors.cidade}
                  helperText={errors.cidade?.message}
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
            variant='contained'
            disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </Box>

        <TipCard />
      </Box>
    </Container>
  )
}
