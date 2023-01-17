'use strict';
const bodyParser = require('body-parser');
const express = require('express')
const port = 3000
const app = express()
const exphbs = require('express-handlebars')
const routes = require('./routes') //  引用路由器


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

require('./config/mongoose')

app.use(bodyParser.urlencoded({ extended: true })) //res.body

app.use(routes)

app.listen(port, () => console.log(`Now server is hosting on https://localhost:${port}`))