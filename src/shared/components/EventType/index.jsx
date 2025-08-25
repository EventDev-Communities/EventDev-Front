import React from 'react'
import Box from '@mui/material/Box'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'

export default function EventTypeSelector({ value, onChange }) {
  return (
    <Box>
      <Box
        sx={{
          p: '6px',
          borderRadius: '8px',
          display: 'inline-flex',
          backgroundColor: '#F1F5F9',
          overflow: 'hidden',
          border: 'none !important',
          boxShadow: 'none !important'
        }}>
        <ToggleButtonGroup
          value={value}
          exclusive
          onChange={(e, val) => val && onChange(val)}
          sx={{
            gap: 1
          }}>
          {['todos', 'online', 'presencial', 'híbrido'].map((type) => (
            <ToggleButton
              key={type}
              value={type}
              disableRipple
              sx={{
                '&': {
                  py: 1,
                  px: 2,
                  fontSize: '12px',
                  border: 'none',
                  textWrap: 'nowrap',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: value === type ? 700 : 500,
                  color: value === type ? '#111827' : '#6b7280',
                  backgroundColor: value === type ? '#fff' : 'transparent'
                },
                '&:hover': {
                  backgroundColor: value === type ? '#fff' : '#e5e7eb'
                },
                '&.Mui-selected, &.Mui-selected:hover': {
                  backgroundColor: '#fff'
                }
              }}>
              {type === 'todos' && 'Todos'}
              {type === 'online' && 'Online'}
              {type === 'presencial' && 'Presencial'}
              {type === 'híbrido' && 'Híbrido'}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </Box>
  )
}
