import { Box, Typography, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import { getShoes } from '../apis/shoes'
import ShoeCard from './ShoeCard'

function Search() {
  const [char, setChar] = useState('')
  const [shoes, setShoes] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const response = await getShoes()
        setShoes(response.data)
      } catch (err) {
        console.error(err)
        setError('Failed to load shoes')
      } finally {
        setLoading(false)
      }
    }

    fetchShoes()
  }, [])

  useEffect(() => {
    if (char.trim() === '') {
      setFiltered([])
      return
    }

    const result = shoes.filter(
      (shoe) =>
        shoe.brand.toLowerCase().includes(char.toLowerCase()) ||
        shoe.model.toLowerCase().includes(char.toLowerCase())
    )
    setFiltered(result)
  }, [char, shoes])

  if (loading) {
    return <Typography>Loading shoes...Where are all the shoes?</Typography>
  }

  if (error) {
    return <Typography>{error}</Typography>
  }

  const handleDelete = (id) => {
    setShoes(list => list.filter(shoe => shoe.id !== id))
  }

  const handleUpdate = (id, updatedData) => {
    setShoes(list => list.map(shoe =>
      shoe.id === id ? { ...shoe, ...updatedData } : shoe
    ))
  }

  return (
    <Box>
      <Typography variant='h3' sx={{ fontWeight: 600, mb: 4 }}>Running<Box component='span' sx={{ fontStyle:'italic', fontWeight: 400,color:'primary.main', letterSpacing: 0.5 }}>Shoes</Box></Typography>
      <Typography variant='h6' sx={{ mb: 4 }}>
        Search Shoe
      </Typography>

      <TextField
        sx={{ mb: 4 }}
        label='Search'
        variant='outlined'
        placeholder='brand or model'
        value={char}
        onChange={(e) => setChar(e.target.value)}
        fullWidth
      />

      {char.trim() !== '' && (
        filtered.length > 0 ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {filtered.map((shoe) => (
              <Box key={shoe.id} sx={{ flex: '0 0 48%' }}>
                <ShoeCard shoe={shoe} onUpdate={handleUpdate} onDelete={handleDelete} />
              </Box>
            ))}
          </Box>
        ) : (
          <Typography>No shoes found – maybe they ran away?</Typography>
        )
      )}
    </Box>
  )
}

export default Search