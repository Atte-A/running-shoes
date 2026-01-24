import { BrowserRouter, Routes, Route } from 'react-router'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Container, Box, Switch, Typography } from '@mui/material'
import Landing from './components/Landing'
import Form from './components/Form'
import List from './components/List'
import Search from './components/Search'
import { useState, useMemo } from 'react'
import { grey, lime, deepOrange } from '@mui/material/colors';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode'
import DrawerMUI from './components/DrawerMUI';

function App() {
  const [mode, setMode] = useState('light')
  const [shoes, setShoes] = useState([])

  const addShoe = (newShoe) => {
    setShoes(prev => [...prev, newShoe])
  }

  const handleChange = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light')
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: { main: lime[500], contrastText: grey[800] },
                error: { main: deepOrange[500], contrastText: grey[100] },
                text: { primary: grey[900], secondary: grey[700] },
              }
            : {
                primary: { main: lime[500] },
                error: { main: deepOrange[500] },
                background: {
                  default: grey[900],
                  paper: grey[900],
                },
                text: { primary: "#fff", secondary: grey[100] },
              }),
        },
      }),
    [mode]
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <DrawerMUI />
                  <Typography variant='h4' sx={{ fontWeight: 700 }}>Running<Box component='span' sx={{ fontStyle:'italic', fontWeight: 400, letterSpacing: 0.5 }}>Shoes</Box></Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
              <Switch checked={mode === "dark"} onChange={handleChange} />
            </Box>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={
            <Container maxWidth={false} disableGutters>
              <Landing />
            </Container>
          }/>
          <Route path="/add" element={
            <Container maxWidth="sm" sx={{ mt: 4 }}>
              <Form addShoe={addShoe} />
            </Container>
          }/>
          <Route path="/list" element={
            <Container maxWidth="sm" sx={{ mt: 4 }}>
              <List list={shoes} />
            </Container>
          }/>
          <Route path="/search" element={
            <Container maxWidth="sm" sx={{ mt: 4 }}>
              <Search list={shoes} />
            </Container>
          }/>
          <Route path="*" element={
            <Container maxWidth={false} disableGutters>
              <Landing />
            </Container>
          }/>
        </Routes>

      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App