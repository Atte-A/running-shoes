import { useState } from 'react'
import { Box, TextField, Button, Typography, Rating } from '@mui/material'
import { lime } from '@mui/material/colors'
import { createShoe } from '../apis/shoes'

function Form ({addShoe}) {
  const [shoe, setShoe] = useState({ brand:'', model: '', price: '', comments: '', grade: 0})
  const [message, setMessage] = useState('')

  const change = (e) => {
    setMessage('')
    setShoe({...shoe, [e.target.name]: e.target.value})
  }

  const changeGrade = (e, newGrade) => {
    setShoe({...shoe, grade: newGrade})
  }

  const add = async () => {
    if (!shoe.brand || !shoe.model) {
      setMessage('Both brand and model is required')
      return
    }

    try {
      const response = await createShoe(shoe)
      addShoe(response.data)

      setMessage('Shoe added')
      setShoe({
        brand: '',
        model: '',
        price: '',
        comments: '',
        grade: 0
      })
    } catch (err) {
      console.log(err)
      setMessage('Error adding shoe')
    }
  }


  return (
    <Box component='form' sx={{ display:'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant='h3' sx={{ fontWeight: 600, mb: 2 }}>Running<Box component='span' sx={{ fontStyle:'italic', fontWeight: 400,color:'primary.main', letterSpacing: 0.5 }}>Shoes</Box></Typography>
      <Typography variant='h6'>Add Shoe</Typography>
      <TextField
      label='Brand'
      name='brand'
      value={shoe.brand}
      onChange={change}
      />
      <TextField
      label='Model'
      name='model'
      value={shoe.model}
      onChange={change}
      />
      <TextField
      label='Price'
      name='price'
      value={shoe.price}
      onChange={change}
      type='number'
      />
      <TextField
      label='Comments'
      name='comments'
      value={shoe.comments}
      onChange={change}
      multiline
      minRows={3}
      maxRows={5}
      fullWidth
      />
      <Box sx={{ display:'flex', gap: 1 }}>
        <Typography>Rating:</Typography>
        <Rating name='grade' value={shoe.grade} onChange={changeGrade} sx={{ color: lime[500]}} />
      </Box>
      <Button variant='contained' onClick={add}>Add Shoe</Button>
      {message && <Typography>{message}</Typography>}
    </Box>
  )
}

export default Form