import * as React from 'react'
import Badge from '@mui/material/Badge'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

function ServerDay(props) {
  const { day, outsideCurrentMonth, highlightedDays = [], ...other } = props

  const isSelected = !outsideCurrentMonth && highlightedDays.includes(day.date())

  return (
    <Badge
      key={day.toString()}
      overlap='circular'
      color='warning'
      variant={isSelected ? 'dot' : undefined}>
      <PickersDay
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
        {...other}
      />
    </Badge>
  )
}

export default function DynamicCalendar({ value, onChange, highlightedDays = [], onMonthChange }) {
  // Detect month/year change and call onMonthChange if provided
  const handleMonthChange = (newDate) => {
    onMonthChange?.(newDate)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value}
        onChange={onChange}
        onMonthChange={handleMonthChange}
        slots={{ day: ServerDay }}
        slotProps={{
          day: { highlightedDays }
        }}
        sx={{
          border: '1px solid #E8E8E8',
          borderRadius: 2,
          backgroundColor: '#fff',
          paddingTop: 1,
          width: '100%',
          maxWidth: 360,
          flex: 1
        }}
      />
    </LocalizationProvider>
  )
}
