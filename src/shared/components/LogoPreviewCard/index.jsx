import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import ListItemText from '@mui/material/ListItemText'

import ImageIcon from '@mui/icons-material/Image'

export default function LogoPreviewCard({ imageData }) {
  return (
    <Card
      elevation={1}
      sx={{ padding: '5px', borderRadius: 2, maxHeight: 560 }}>
      <CardContent>
        <Typography
          gutterBottom
          fontWeight='bold'
          fontSize={'15px'}
          variant='subtitle1'>
          Prévia da Logo
        </Typography>

        <Box
          sx={{
            height: '310px',
            width: '310px',
            marginBottom: 2,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f1f5f9'
          }}>
          {imageData ? (
            <Box
              component='img'
              src={typeof imageData === 'string' ? imageData : imageData.url}
              alt={typeof imageData === 'string' ? 'Logo' : imageData.name}
              sx={{
                width: '100%',
                height: '100%',
                border: '1px solid #dee3e9',
                borderRadius: 2,
                objectFit: 'cover'
              }}
            />
          ) : (
            <ImageIcon sx={{ fontSize: 40, color: '#94a3b8' }} />
          )}
        </Box>

        <Typography
          variant='subtitle1'
          fontSize={'15px'}
          fontWeight='bold'
          marginTop='1.5rem'>
          Benefícios de cadastrar sua comunidade
        </Typography>

        <List
          disablePadding
          dense>
          {[
            'Divulgue seus eventos para um público mais amplo.',
            'Gerencie todos os seus eventos em um só lugar.',
            'Aumente a visibilidade da sua comunidade.',
            'Conecte-se com outros organizadores de eventos.'
          ].map((text) => (
            <ListItem
              key={text}
              disableGutters
              sx={{ paddingLeft: 0 }}>
              <ListItemText primary={<Typography fontSize={12}>• {text}</Typography>} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
