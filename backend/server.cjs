const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const db = require('./db')
const app = express()

app.use(cors())
app.use(helmet({crossOriginResourcePolicy: false}))
app.use(express.urlencoded({ extended: true, limit: '5mb' }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server is running!')
})

app.post('/shoes', (req, res) => {
  const { brand, model, price, comments, grade } = req.body

  if (!brand || !model) {
    return res.status(400).json({error: 'Brand and model are both required'})
  }

  const query =
  'INSERT INTO shoes (brand, model, price, comments, grade) VALUES (?, ?, ?, ?, ?)'
  
  db.run(query, [brand, model, price, comments, grade], function (err) {
    if (err) return res.status(500).json({ error: err.message })

    res.status(201).json({ id: this.lastID, brand, model, price, comments, grade})
  })
})

app.get('/shoes', (req, res) => {
  db.all('SELECT * FROM shoes', [], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    return res.json(result)
  })
})

app.get('/shoes/:id', (req, res) => {
  const { id } = req.params

  db.get('SELECT * FROM shoes WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    if (!result) {
      return res.status(404).json({ message: 'Shoe not found' })
    }
    
    return res.json(result)
  })
})

app.put('/shoes/:id', (req, res) => {
  const { id } = req.params
  const { brand, model, price, comments, grade } = req.body

  if (!brand || !model) {
    return res.status(400).json({ error: 'Both brand and model are required' })
  }

  db.run('UPDATE shoes SET brand = ?, model = ?, price = ?, comments = ?, grade = ? WHERE id = ?',
    [brand, model, price, comments, grade, id], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message })
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: 'Shoe not found' })
      }

      res.json({ message: 'Shoe updated successfully'})
    })
  })

app.delete('/shoes/:id', (req, res) => {
  const { id } = req.params

  db.run('DELETE FROM shoes WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'No shoe to delete' })
    }

    return res.status(204).send()
  })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
});
