const ConnectToMongo = require('./db');
const notesRoute = require('./routes/notes');
const cors = require('cors');
ConnectToMongo();
const express = require('express')
const app = express()

const port = 5000 
app.use(cors());
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello Lokesh!')
})
//apis in use 
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', notesRoute)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 