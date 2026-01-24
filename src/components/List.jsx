import { Box, Grid, Typography } from '@mui/material'
import { getShoes } from '../apis/shoes'
import { useState, useEffect } from 'react'
import ShoeCard from './ShoeCard'

function List(){
  const [shoes, setShoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchShoes() {
      try {
        const response = await getShoes()
        setShoes(response.data)
      } catch (err) {
        console.log(err)
        setError('Failed to load shoes')
      } finally {
        setLoading(false)
      }
    }

    fetchShoes()
  }, [])

  if (loading) {
    return (
      <Typography>Loading shoes...Where are all the shoes?</Typography>
    )
  }
  
  if (error) {
    return (
      <Typography>{error}</Typography>
    )
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
      <Typography variant='h6' sx={{ mb: 4 }}>All Shoes ({shoes.length})</Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'space-between' }}>
        <Grid container spacing={3}>
          {shoes.map((shoe) => (
            <Grid key={shoe.id} sx={{ flex: '0 0 40%' }}>
              <ShoeCard shoe={shoe} onDelete={handleDelete} onUpdate={handleUpdate} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default List