const express = require('express')
const router = express.Router()
const AccountSchema = require('../../models/AccountSchema')
require('../../config/mongoose')


router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const userAccount = req.body.email
  const userPassword = req.body.password
  console.log(AccountSchema.findOne({ email: userAccount }))
  AccountSchema.findOne({ email: userAccount })
    .lean()
    .then(data => {
      if (data.password == userPassword) {
        res.redirect(`/users/${data.firstName}`)
      } else {
        res.send('Password 錯誤')
      }
    })
    .catch(err => res.send('Username 或 Password 錯誤'))
})

module.exports = router