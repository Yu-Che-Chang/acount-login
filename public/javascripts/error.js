const emailInput = document.querySelector('#floatingInput')
const passwordInput = document.querySelector('#invalid-feedback')

function errorSwitch(type) {
  switch (type) {
    case 'bothWrong':
      emailInput.classList.add('was-validated')
      passwordInput.classList.add('was-validated');
    case 'passwordWrong':
      passwordInput.classList.add('was-validated');
  }
}

module.exports = errorSwitch