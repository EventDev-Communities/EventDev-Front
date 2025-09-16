import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import styles from './ResetPassword.module.css'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'

export default function FormResetPassword() {
  return (
    <Box
      className={styles.container}
      component='form'
      noValidate
      autoComplete='on'>
      <div className={styles.titleContainer}>
        <Typography
          variant='h2'
          component='h2'
          sx={{ marginBottom: '1rem' }}>
          Redefinir <span className={styles.gradientText}>SENHA</span>
        </Typography>
        <Typography
          variant='body1'
          component='p'
          sx={{ color: '#64748B', textAlign: 'center' }}>
          Digite seu email abaixo e enviaremos instruções para redefinir sua senha.
        </Typography>
      </div>

      <div className={styles.formContainer}>
        <Typography
          component='label'
          htmlFor='email'
          variant='subtitle1'
          fontWeight='bold'
          sx={{ marginTop: '1rem' }}>
          Email
        </Typography>
        <TextField
          required
          id='email'
          placeholder='seu@email.com'
          name='email'
          autoComplete='email'
          type='email'
          sx={{ width: '100%' }}
        />
      </div>
      <Button
        sx={{ marginTop: '1rem', width: '100%' }}
        type='submit'
        variant='contained'>
        Enviar Instruções
      </Button>
      <Typography
        variant='body2'
        component='p'
        sx={{ marginTop: '1rem', textAlign: 'center' }}
        underline='hover'>
        Lembrou da senha?{' '}
        <Link
          href='/login'
          underline='hover'
          color='text.secondary'
          display='block'
          sx={{ color: '#FC692D', textDecoration: 'none', fontWeight: 'bold' }}>
          Voltar ao login
        </Link>
      </Typography>
      <Typography
        variant='body1'
        component='p'
        sx={{ marginTop: '1.5rem', color: '#64748B', fontSize: '1.20rem', textAlign: 'center' }}>
        Você receberá um email com instruções para redefinir sua senha.
      </Typography>
    </Box>
  )
}
