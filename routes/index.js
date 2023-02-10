const express = require("express");
const router = express.Router()

const home = require('./modules/home')
router.use('/', home)
router.use('/users', home)

// 404 get error
router.all('*', (req, res) => {
  res.status(404).send('<h1>404! Page not found</h1>');
})

module.exports = router