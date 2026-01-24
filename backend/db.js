const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const dbPath = path.join(__dirname, 'database.sqlite')

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to SQLite DB: ', err.message)
  } else {
    console.log('Connected to SQLite DB.')
    
    db.run(
    `CREATE TABLE IF NOT EXISTS shoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,
      price INTEGER,
      comments TEXT,
      grade INTEGER
    )`,
      (err) => {
        if (err) {
          console.error('Error creating items table: ', err.message)
        } else {
          console.log('Table is created.')
        }
      }
    )
  }
})


module.exports = db
