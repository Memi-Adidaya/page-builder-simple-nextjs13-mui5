import React from 'react'
import type { PageStyles } from '../../types/types'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import { Divider } from '@mui/material'

interface PageSidebarProps {
  styles: PageStyles
  onUpdateStyles: (newStyles: Partial<PageStyles>) => void
}

const unitOptions: PageStyles['minHeightUnit'][] = ['px', 'rem', 'em', '%', 'vh']

// A reusable input for value + unit
const UnitInput: React.FC<{
  label: string
  value: number
  unit: string
  onValueChange: (value: number) => void
  onUnitChange: (unit: any) => void
  placeholder?: string
}> = ({ label, value, unit, onValueChange, onUnitChange, placeholder }) => (
  <Box sx={{ mb: 2 }}>
    {/* Label */}
    <Typography variant='body2' sx={{ fontWeight: 500, color: 'text.primary', mb: 0.5 }}>
      {label}
    </Typography>

    {/* Input + Select kombinasi */}
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        type='number'
        value={value}
        onChange={e => onValueChange(Number(e.target.value))}
        placeholder={placeholder}
        variant='outlined'
        fullWidth
        size='small'
        sx={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          '& .MuiOutlinedInput-root': {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
          }
        }}
      />

      <TextField
        select
        value={unit}
        onChange={e => onUnitChange(e.target.value)}
        variant='outlined'
        size='small'
        sx={{
          minWidth: 80,
          bgcolor: 'grey.50',
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          '& .MuiOutlinedInput-root': {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
          }
        }}
      >
        {unitOptions.map(u => (
          <MenuItem key={u} value={u}>
            {u}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  </Box>
)

export const PageSidebar: React.FC<PageSidebarProps> = ({ styles, onUpdateStyles }) => {
  const handleSimpleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onUpdateStyles({ [name]: Number(value) })
  }

  return (
    <Box
      component='aside'
      sx={{
        width: 300,
        bgcolor: 'background.paper',
        p: 2,
        borderLeft: 1,
        borderColor: 'divider',
        overflowY: 'auto',
        height: '100vh'
      }}
    >
      <Box>
        {/* Header */}
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            pb: 1.5,
            mb: 3
          }}
        >
          <Typography variant='subtitle2' sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            Page Styles
          </Typography>
          <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
            Global settings for the main canvas
          </Typography>
        </Box>

        {/* Padding input */}
        <Box sx={{ mb: 3 }}>
          <TextField
            id='page-padding'
            name='padding'
            type='number'
            label='Padding (px)'
            value={styles.padding}
            onChange={handleSimpleChange}
            variant='outlined'
            fullWidth
            size='small'
          />
        </Box>

        {/* Margin input */}
        <Box sx={{ mb: 3 }}>
          <TextField
            id='page-margin'
            name='margin'
            type='number'
            label='Vertical Margin (px)'
            value={styles.margin}
            onChange={handleSimpleChange}
            variant='outlined'
            fullWidth
            size='small'
          />
          <Typography variant='caption' sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
            Horizontal margin is centered automatically.
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />
        <UnitInput
          label='Min Height'
          value={styles.minHeight}
          unit={styles.minHeightUnit}
          onValueChange={val => onUpdateStyles({ minHeight: val })}
          onUnitChange={unit => onUpdateStyles({ minHeightUnit: unit })}
        />
        <UnitInput
          label='Max Height'
          value={styles.maxHeight}
          unit={styles.maxHeightUnit}
          onValueChange={val => onUpdateStyles({ maxHeight: val })}
          onUnitChange={unit => onUpdateStyles({ maxHeightUnit: unit })}
          placeholder='0 for none'
        />
      </Box>
    </Box>
  )
}
