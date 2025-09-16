import React, { useEffect, useState, useCallback } from 'react'
import Stack from '@mui/material/Stack'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Box from '@mui/material/Box'
import DynamicCalendar from '@/shared/components/DynamicCalendar'
import SelectedDatePanel from '@/shared/components/SelectDatePanel'
import { getEvents } from '../../../api/event'

dayjs.locale('pt-br')

export default function CalendarView({ eventType = 'todos' }) {
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [eventos, setEventos] = useState([])
  const [highlightedDays, setHighlightedDays] = useState([])

  // Função utilitária para comparar modalidade
  const modalityMatch = (event, type) => type === 'todos' || event.modality === type

  useEffect(() => {
    getEvents().then(setEventos)
  }, [])

  // Atualiza os dias destacados ao mudar mês/ano ou filtro
  const handleMonthChange = useCallback(
    (newDate) => {
      const diasComEvento = eventos
        .filter(
          (evento) =>
            dayjs(evento.start_date_time).month() === dayjs(newDate).month() &&
            dayjs(evento.start_date_time).year() === dayjs(newDate).year() &&
            modalityMatch(evento, eventType)
        )
        .map((evento) => dayjs(evento.start_date_time).date())
      setHighlightedDays([...new Set(diasComEvento)])
    },
    [eventos, eventType]
  )

  useEffect(() => {
    handleMonthChange(selectedDate)
  }, [selectedDate, eventos, eventType, handleMonthChange])

  // Filtra eventos do dia selecionado e pelo tipo
  const eventosDoDia = eventos.filter((evento) => dayjs(evento.start_date_time).isSame(selectedDate, 'day') && modalityMatch(evento, eventType))

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}>
        <Box
          sx={{
            width: { xs: '100%', md: 'auto' },
            minWidth: { md: 350 },
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-start' }
          }}>
          <DynamicCalendar
            value={selectedDate}
            onChange={setSelectedDate}
            highlightedDays={highlightedDays}
            onMonthChange={handleMonthChange}
          />
        </Box>
        <SelectedDatePanel
          selectedDate={selectedDate.toISOString()}
          eventos={eventosDoDia}
        />
      </Stack>
    </LocalizationProvider>
  )
}
