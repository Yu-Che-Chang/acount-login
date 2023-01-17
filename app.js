'use strict';
const bodyParser = require('body-parser');
const express = require('express')
const port = 3000
const app = express()
const exphbs = require('express-handlebars')
const AccountSchema = require('./models/AccountSchema')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

require('./config/mongoose')

app.use(bodyParser.urlencoded({ extended: true })) //res.body

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const userAccount = req.body.email
  const userPassword = req.body.password
  AccountSchema.findOne({ email: userAccount, password: userPassword })
    .lean()
    .then(data => {
      console.log(data.firstName)
      res.redirect(`/users/${data.firstName}`)
    })
    .catch(err => res.send('Username 或Password 錯誤'))
})

app.get('/users/:name', (req, res) => {
  const userName = req.params.name
  res.send(`Welcome back,${userName} `)
})

app.listen(port, () => console.log(`Now server is hosting on https://localhost:${port}`))