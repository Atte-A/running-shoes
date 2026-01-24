import { useState } from 'react'
import { Link } from 'react-router'
import { IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ListAltIcon from '@mui/icons-material/ListAlt'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

function DrawerMUI() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }

  return (
    <>
      <IconButton onClick={handleOpen}><MenuIcon sx={{ mr: 1}}/></IconButton>
      <Drawer open={open} onClick={handleClose} >
        <List>
          <ListItem>
            <ListItemButton component={Link} to='/'>
              <ListItemIcon><HomeOutlinedIcon/></ListItemIcon>
              <ListItemText primary='Home'/>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={Link} to='/add'>
              <ListItemIcon><AddIcon/></ListItemIcon>
              <ListItemText primary='Add Shoe' />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={Link} to='/list'>
              <ListItemIcon><ListAltIcon/></ListItemIcon>
              <ListItemText primary='All Shoes' />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={Link} to='/search'>
              <ListItemIcon><SearchIcon/></ListItemIcon>
              <ListItemText primary='Search Shoes' />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}

export default DrawerMUI