import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
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
import { createEndereco, getEnderecoByCep, updateEndereco } from '@/api/endereco'

const today = new Date().toISOString().split('T')[0]

const eventSchema = z
  .object({
    nomeEvento: z.string().min(1, 'O título do Evento é obrigatório'),
    descricaoEvento: z.string().min(1, 'A descrição é obrigatória'),
    data: z.string().refine((val) => val >= today, { message: 'A data não pode ser anterior a hoje' }),
    horarioInicial: z.string().min(1, 'Horário inicial obrigatório'),
    horarioFinal: z.string().min(1, 'Horário final obrigatório'),
    modalidade: z.enum(['presencial', 'online', 'hibrido'], {
      required_error: 'Selecione a modalidade do evento',
      invalid_type_error: 'Selecione a modalidade do evento'
    }),
    cep: z.string().optional(),
    rua: z.string().optional(),
    numero: z.string().optional(),
    bairro: z.string().optional(),
    estado: z.string().optional(),
    cidade: z.string().optional(),
    link: z.string().url('Link deve ser uma URL válida').optional().or(z.literal(''))
  })
  .superRefine((data, ctx) => {
    // Validação de horário: inicial deve ser menor que final
    if (data.horarioInicial && data.horarioFinal) {
      const [horaIni, minIni] = data.horarioInicial.split(':').map(Number)
      const [horaFim, minFim] = data.horarioFinal.split(':').map(Number)
      const inicialMinutos = horaIni * 60 + minIni
      const finalMinutos = horaFim * 60 + minFim
      if (inicialMinutos >= finalMinutos) {
        ctx.addIssue({
          path: ['horarioFinal'],
          message: 'Horário final deve ser posterior ao horário inicial',
          code: 'custom'
        })
      }
    }
    // Validação de endereço para modalidades não-online
    if (data.modalidade && data.modalidade !== 'online') {
      if (!data.cep) ctx.addIssue({ path: ['cep'], message: 'CEP obrigatório', code: 'custom' })
      if (!data.rua) ctx.addIssue({ path: ['rua'], message: 'Rua obrigatória', code: 'custom' })
      if (!data.numero) ctx.addIssue({ path: ['numero'], message: 'Número obrigatório', code: 'custom' })
      if (!data.bairro) ctx.addIssue({ path: ['bairro'], message: 'Bairro obrigatório', code: 'custom' })
      if (!data.estado) ctx.addIssue({ path: ['estado'], message: 'Estado obrigatório', code: 'custom' })
      if (!data.cidade) ctx.addIssue({ path: ['cidade'], message: 'Cidade obrigatória', code: 'custom' })
    }
  })

export default function EditEvent() {
  const { eventoId } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [cepLoading, setCepLoading] = useState(false)
  const [cepError, setCepError] = useState('')
  const [evento, setEvento] = useState(null)
  const [enderecoId, setEnderecoId] = useState(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    control
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      modalidade: ''
    }
  })

  const watchedModalidade = watch('modalidade', '')
  const watchedCep = watch('cep', '')

  useEffect(() => {
    async function fetchEvento() {
      try {
        const eventos = await getEventos()
        const eventoEncontrado = eventos.find((e) => String(e.id) === String(eventoId))
        if (!eventoEncontrado) {
          setSubmitError('Evento não encontrado')
          return
        }
        setEvento(eventoEncontrado)
        setEnderecoId(eventoEncontrado.id_endereco || null)

        // Preenche os campos do formulário
        reset({
          nomeEvento: eventoEncontrado.titulo || '',
          descricaoEvento: eventoEncontrado.descricao || '',
          data: eventoEncontrado.data_hora_inicial?.split('T')[0] || '',
          horarioInicial: eventoEncontrado.data_hora_inicial?.split('T')[1]?.slice(0, 5) || '',
          horarioFinal: eventoEncontrado.data_hora_final?.split('T')[1]?.slice(0, 5) || '',
          modalidade: eventoEncontrado.modalidade || '',
          cep: eventoEncontrado.endereco?.cep || '',
          rua: eventoEncontrado.endereco?.rua || '',
          numero: eventoEncontrado.endereco?.numero || '',
          bairro: eventoEncontrado.endereco?.bairro || '',
          estado: eventoEncontrado.endereco?.estado || '',
          cidade: eventoEncontrado.endereco?.cidade || '',
          link: eventoEncontrado.link || ''
        })
      } catch (err) {
        setSubmitError('Erro ao carregar evento', err)
      }
    }
    fetchEvento()
  }, [eventoId, reset])

  const handleCepBlur = async () => {
    if (!watchedCep || watchedCep.length < 8) return
    setCepLoading(true)
    setCepError('')
    try {
      const endereco = await getEnderecoByCep(watchedCep.replace(/\D/g, ''))
      setValue('rua', endereco.rua)
      setValue('bairro', endereco.bairro)
      setValue('cidade', endereco.cidade)
      setValue('estado', endereco.estado)
    } catch (err) {
      setCepError('CEP não encontrado', err)
      setValue('rua', '')
      setValue('bairro', '')
      setValue('cidade', '')
      setValue('estado', '')
    } finally {
      setCepLoading(false)
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitError('')
    try {
      let enderecoAtualizado = enderecoId
      if (data.modalidade !== 'online') {
        const enderecoData = {
          cep: data.cep || '',
          rua: data.rua || '',
          numero: data.numero || '',
          bairro: data.bairro || '',
          cidade: data.cidade || '',
          estado: data.estado || ''
        }
        if (enderecoId) {
          await updateEndereco(enderecoId, enderecoData)
        } else {
          const novoEndereco = await createEndereco(enderecoData)
          enderecoAtualizado = novoEndereco.id
        }
      } else {
        enderecoAtualizado = null
      }

      const eventoAtualizado = {
        titulo: data.nomeEvento,
        descricao: data.descricaoEvento,
        data_hora_inicial: `${data.data}T${data.horarioInicial}:00`,
        data_hora_final: `${data.data}T${data.horarioFinal}:00`,
        modalidade: data.modalidade,
        id_comunidade: evento?.id_comunidade,
        id_endereco: enderecoAtualizado,
        capa_url: evento?.capa_url || '',
        link: data.link || '',
        evento: true,
        ativo: true,
        atualizado_em: new Date().toISOString()
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

  if (!evento) {
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

          <BannerImg imageData={evento?.capa_url} />

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
                  sx={{ mt: '0.5rem', color: 'text.secondary', display: 'block' }}>
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
                  sx={{ mt: '0.5rem', color: 'text.secondary', display: 'block' }}>
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
                  sx={{ mt: '0.5rem', color: 'text.secondary', display: 'block' }}>
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
                  <Controller
                    name='modalidade'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId='modalidade-label'
                        id='modalidade'
                        label='Modalidade do Evento'>
                        <MenuItem value='presencial'>Presencial</MenuItem>
                        <MenuItem value='online'>Online</MenuItem>
                        <MenuItem value='hibrido'>Híbrido</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
                <Typography
                  variant='caption'
                  sx={{ mt: '0.5rem', color: 'text.secondary', display: 'block' }}>
                  Selecione o tipo de modalidade do evento
                </Typography>
                {errors.modalidade && (
                  <Typography
                    variant='caption'
                    color='error.main'
                    sx={{ display: 'block' }}>
                    {errors.modalidade.message}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Link do evento (opcional para eventos online) */}
            {watchedModalidade === 'online' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', mb: '2rem' }}>
                <Typography
                  component='label'
                  htmlFor='link'
                  variant='subtitle1'
                  fontWeight='bold'
                  sx={{ mb: '0.5rem' }}>
                  Link do Evento (Opcional)
                </Typography>
                <TextField
                  id='link'
                  placeholder='https://meet.google.com/...'
                  {...register('link')}
                  error={!!errors.link}
                  helperText={errors.link?.message}
                  sx={{ width: '100%' }}
                />
                <Typography
                  variant='caption'
                  sx={{ mt: '0.5rem', color: 'text.secondary' }}>
                  Link para acesso ao evento online
                </Typography>
              </Box>
            )}

            {watchedModalidade && watchedModalidade !== 'online' && (
              <Box sx={{ display: 'flex', gap: '3rem', mb: '2rem', flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1, minWidth: 200 }}>
                  <Typography
                    component='label'
                    variant='subtitle1'
                    fontWeight='bold'
                    sx={{ mb: '0.5rem', display: 'block' }}>
                    CEP
                  </Typography>
                  <TextField
                    id='cep'
                    placeholder='Digite o CEP'
                    {...register('cep')}
                    error={!!errors.cep || !!cepError}
                    helperText={errors.cep?.message || cepError}
                    sx={{ width: '100%' }}
                    onBlur={handleCepBlur}
                    disabled={cepLoading}
                  />
                  <Typography
                    variant='caption'
                    sx={{ mt: '0.5rem', color: 'text.secondary', display: 'block' }}>
                    Digite o CEP para buscar endereço automaticamente
                  </Typography>
                </Box>
                <Box sx={{ flex: 2, minWidth: 200 }}>
                  <Typography
                    component='label'
                    variant='subtitle1'
                    fontWeight='bold'
                    sx={{ mb: '0.5rem', display: 'block' }}>
                    Rua
                  </Typography>
                  <TextField
                    id='rua'
                    placeholder='Rua'
                    {...register('rua')}
                    error={!!errors.rua}
                    helperText={errors.rua?.message}
                    sx={{ width: '100%' }}
                  />
                </Box>
                <Box sx={{ flex: 1, minWidth: 100 }}>
                  <Typography
                    component='label'
                    variant='subtitle1'
                    fontWeight='bold'
                    sx={{ mb: '0.5rem', display: 'block' }}>
                    Número
                  </Typography>
                  <TextField
                    id='numero'
                    placeholder='Número'
                    {...register('numero')}
                    error={!!errors.numero}
                    helperText={errors.numero?.message}
                    sx={{ width: '100%' }}
                  />
                </Box>
                <Box sx={{ flex: 1, minWidth: 150 }}>
                  <Typography
                    component='label'
                    variant='subtitle1'
                    fontWeight='bold'
                    sx={{ mb: '0.5rem', display: 'block' }}>
                    Bairro
                  </Typography>
                  <TextField
                    id='bairro'
                    placeholder='Bairro'
                    {...register('bairro')}
                    error={!!errors.bairro}
                    helperText={errors.bairro?.message}
                    sx={{ width: '100%' }}
                  />
                </Box>
                <Box sx={{ flex: 1, minWidth: 120 }}>
                  <Typography
                    component='label'
                    variant='subtitle1'
                    fontWeight='bold'
                    sx={{ mb: '0.5rem', display: 'block' }}>
                    Estado
                  </Typography>
                  <TextField
                    id='estado'
                    placeholder='Estado'
                    {...register('estado')}
                    error={!!errors.estado}
                    helperText={errors.estado?.message}
                    sx={{ width: '100%' }}
                  />
                </Box>
                <Box sx={{ flex: 1, minWidth: 120 }}>
                  <Typography
                    component='label'
                    variant='subtitle1'
                    fontWeight='bold'
                    sx={{ mb: '0.5rem', display: 'block' }}>
                    Cidade
                  </Typography>
                  <TextField
                    id='cidade'
                    placeholder='Cidade'
                    {...register('cidade')}
                    error={!!errors.cidade}
                    helperText={errors.cidade?.message}
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Box>
            )}
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
