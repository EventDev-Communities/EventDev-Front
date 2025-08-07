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
            overflow: 'hidden !important',
            border: 'none !important',
            boxShadow: 'none !important'
          }}>
          {['todos', 'online', 'presencial'].map((type) => (
            <ToggleButton
              key={type}
              value={type}
              disableRipple
              sx={{
                'textTransform': 'none',
                'px': 3,
                'py': 1,
                'border': 'none !important',
                'borderRadius': '4px !important',
                'fontWeight': value === type ? 700 : 500,
                'backgroundColor': value === type ? '#fff' : 'transparent',
                'color': value === type ? '#111827' : '#6b7280',
                '&.Mui-selected': {
                  backgroundColor: '#fff',
                  color: '#111827',
                  boxShadow: 'none',
                  border: 'none !important',
                  minWidth: '0 !important',
                  borderRadius: '10px !important'
                },
                '&:hover': {
                  backgroundColor: value === type ? '#fff' : '#e2e8f0'
                },
                '&:focus': {
                  outline: 'none !important',
                  boxShadow: 'none !important'
                },
                '&.Mui-focusVisible': {
                  outline: 'none !important',
                  boxShadow: 'none !important'
                }
              }}>
              {type === 'todos' && 'Todos'}
              {type === 'online' && 'Online'}
              {type === 'presencial' && 'Presencial'}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </Box>
  )
}
