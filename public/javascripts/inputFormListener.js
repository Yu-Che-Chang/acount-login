const emailInput = document.querySelector('#floatingInput')
const form = document.querySelector('.login-form')
const wrong = document.querySelector('.invalid-feedback')

form.addEventListener('submit', function formOnSubmitted(e) {
  if (!emailInput.value.trim()) {
    wrong.innerText = '請輸入帳號密碼'
    form.classList.add('was-validated')
    e.preventDefault()
  }
})

