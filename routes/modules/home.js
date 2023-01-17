const express = require('express')
const router = express.Router()
const AccountSchema = require('../../models/AccountSchema')
require('../../config/mongoose')
const alert = ''

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const userAccount = req.body.email
  const userPassword = req.body.password
  console.log(req.body)
  //  如果帳號正確的登入
  console.log(AccountSchema.findOne({ email: userAccount }))
  AccountSchema.findOne({ email: userAccount })
    .lean()
    .then(data => {
      // 帳號密碼正確即登入
      if (data) {
        if (data.password === userPassword) {
          console.log('歡迎登入')
          res.redirect(`/users/${data.firstName}`)
        } else {
          // 帳號正確密碼錯誤
          console.log('Password 錯誤')
          res.render('index', { userAccount: data.email, alert: '密碼錯誤，請再輸入一次' })
        }
      } else {
        //帳號密碼都錯誤
        console.log('帳號密碼都錯誤')
        res.render('index', { alert: '帳號和密碼錯誤，請再輸入一次' })
      }
    })
  .catch(err => { console.log(err) })
})

module.exports = router