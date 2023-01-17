const express = require('express')
const router = express.Router()
const AccountSchema = require('../../models/AccountSchema')
require('../../config/mongoose')

router.get('/:name', (req, res) => {
  const userName = req.params.name
  res.send(`Welcome back,${userName} `)
})

module.exports = router