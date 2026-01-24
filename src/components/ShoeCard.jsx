import { useState } from 'react'
import { Box,Button, Card, CardMedia, CardContent, Typography, Rating, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import { lime } from '@mui/material/colors'
import shoeImage from '../assets/shoeImage.png'
import { deleteShoe, updateShoe } from '../apis/shoes'

function ShoeCard({ shoe, onDelete, onUpdate }) {
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(shoe)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const deleteItem = async () => {
    try {
      await deleteShoe(shoe.id)
      onDelete(shoe.id)
    } catch (err) {
      if (err) {
        console.log(err)
        setError('Failed to delete')
      }
    }
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
  }
  
  const confirmDelete = async () => {
    await deleteItem()
    setDeleteDialogOpen(false)
  }

  const openEdit = () => {
    setFormData(shoe)
    setError(null)
    setOpen(true)
  }

  const saveEdit = async () => {
    if (!formData.brand || !formData.model) {
      setError('Brand and model are required')
      return
    }

    try {
      await updateShoe(shoe.id, formData)
      onUpdate(shoe.id, formData)
      setOpen(false)
    } catch (err) {
      if (err) {
        console.log(err)
        setError('Failed to update')
      }
    }
  }

  const change = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const changeGrade = (e, newGrade) => {
    setFormData({ ...formData, grade: newGrade })
  }

  if (error) {
    return <Typography>{error}</Typography>
  }

  return (
    <>
    <Card sx={{ }}>
      <CardMedia 
      component='img'
      image={shoeImage}
      alt='Generic shoe'
      sx={{ height: 120, width: 70, objectFit: 'contain', display: 'block', mx: 'auto'}}
      />
      <CardContent sx={{ display: 'block' , mx: 'auto'}}>
        <Typography variant='h5'>{shoe.brand}</Typography>
        <Typography variant='h7'>{shoe.model}</Typography>
        <Typography>{shoe.price} €</Typography>
        <Box sx={{ mt: 1,minHeight: '48px', overflow: 'hidden', display:'-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
          <Typography>Comments: </Typography>
          <Typography>{shoe.comments}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Typography>Rating:</Typography>
          <Rating value={shoe.grade} readOnly sx={{ color: lime[500] }} />
        </Box>
        <Box sx={{ mt: 2}}>
          <Button variant='contained' sx={{ marginRight: 1}}onClick={openEdit}>Edit</Button>
          <Button variant='contained' color='error' onClick={handleDeleteClick}>Delete</Button>
        </Box>
      </CardContent>
    </Card>
    <Dialog open={open} onClose={() => setOpen(false)} disableEnforceFocus disableAutoFocus>
      <DialogTitle>Edit shoe</DialogTitle>
      <DialogContent dividers sx={{ pt: 2, pb: 2, display:'flex', flexDirection:'column', gap: 2, mt: 1 }}>
        <TextField label='Brand' name='brand' value={formData.brand} onChange={change}/>
        <TextField label='Model' name='model' value={formData.model} onChange={change}/>
        <TextField label='Price' name='price' value={formData.price} type='number' onChange={change}/>
        <TextField label='Comments' name='comments' value={formData.comments} multiline onChange={change}/>
        <Box>
          <Typography>Rating: </Typography>
          <Rating value={formData.grade} onChange={changeGrade}/>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button variant='contained' onClick={saveEdit}>Save</Button>
      </DialogActions>
    </Dialog>
    <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
      <DialogTitle>Delete Shoe</DialogTitle>
      <DialogContent>
        <Typography>
          Sure you want to delete <strong>{shoe.brand} {shoe.model}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
        <Button color='error' variant='contained' onClick={confirmDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

export default ShoeCard