import Container from '@mui/material/Container'
import FormResetPassword from '@/shared/components/FormResetPassword'

export default function ResetPassword() {
  return (
    <Container
      maxWidth='xl'
      sx={{ paddingTop: '3.5rem' }}>
      <FormResetPassword />
    </Container>
  )
}
