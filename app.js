'use strict';
const express = require('express')
const port = 3000
const app = express()
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

require('./config/mongoose')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  
})

app.listen(port, () => console.log(`Now server is hosting on https://localhost:${port}`))