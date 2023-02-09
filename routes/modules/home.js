const express = require('express')
const { ClientSession } = require('mongodb')
const router = express.Router()
const AccountSchema = require('../../models/AccountSchema')
require('../../config/mongoose')
const randomId = require('../../public/javascripts/randomId')
const alert = ''
let sessionStore = []

// 手刻 Cookie-based Authentication 憑證交換機制
// 使用者登入('/login')頁面
// 判斷request server判斷是否有cookie sessionID
// 沒有：首次登入 輸入email.psw； 建立新 session 產生 sessionID
// 有：讀取cookie sessionID 辨識身份

router.get('/', (req, res) => {
  //檢查用戶request 是否為登入狀態
  const cookieSessionId = req.cookies.sessionId
  let userName = ''
  // 確認是否有存取session
  if (sessionStore.find(user => {
    userName = user.userFirstName
    return (user.sessionId === cookieSessionId)
  })) {
    console.log(`用戶${userName}已登入`)
    res.redirect(`/users/${userName}`)
  } else {
    console.log('新用戶登入')
    res.render('index')
  }
})

router.get('/logout', (req, res) => {
  res.cookie("sessionId", req.cookies.sessionId, {
    maxAge: -1 // 過期
  })
  console.log('登出成功')
  res.redirect('/')
})

// 用戶登入
router.post('/login', (req, res) => {
  const { email, password } = req.body
  //  如果帳號正確的登入
  AccountSchema.findOne({ email })
    .lean()
    .then(data => {
      // 帳號密碼正確即登入
      if (data) {
        if (data.password === password) {
          console.log('歡迎登入')
          let sessionId = randomId(16)
          // 先產成session Id 存入 session store
          applySessionStore(data.firstName, data.email, sessionId)
          res.cookie('sessionId', sessionId) // 手動產生sessionId 16碼
          res.redirect(`/users/${data.firstName}`)
        } else {
          // 帳號正確密碼錯誤
          console.log('Password 錯誤')
          res.render('index', { email: data.email, alert: '密碼錯誤，請再輸入一次' })
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

function applySessionStore(userFirstName, userEmail, sessionId) {
  sessionStore.push({ 'userFirstName': userFirstName, 'userEmail': userEmail, 'sessionId': sessionId })
  console.log('create new session')
}