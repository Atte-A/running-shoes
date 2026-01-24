import { Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router'
import backgroundImage from '../assets/backgroundImage.png'

function Landing() {
  return (
    <Box sx={{ height: '100vh', width:'100%', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition:'center', backgroundRepeat: 'no-repeat', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2}}>
      <Typography variant='h2' sx={{ fontWeight: 600}}>Running<Box component='span' sx={{ fontStyle:'italic', fontWeight: 500, color:'primary.main', letterSpacing: 0.5 }}>Shoes</Box></Typography>
      <Typography variant='h4' sx={{ fontWeight: 600,letterSpacing: 1.2 }}>Keep track of your shoe rotation.</Typography>
      <Typography variant='h6' sx={{ fontWeight: 500, letterSpacing: 1.2 }}>Add, search and manage your collection.</Typography>
      <Button component={Link} to='add' variant='contained' sx={{ mt: 2 }}>Get started</Button>
    </Box>
  )
}

export default Landing