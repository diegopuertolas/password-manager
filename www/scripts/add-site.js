import Api from './api.js';

const apiService = new Api();

const params = new URLSearchParams(window.location.search);
const categoryId = params.get('categoryId');

const siteForm = document.getElementById('site-form');
const nameInput = document.getElementById('site-name');
const urlInput = document.getElementById('site-url');
const userInput = document.getElementById('site-user');
const passwordInput = document.getElementById('site-password');
const descriptionInput = document.getElementById('site-description');
const btnCancel = document.getElementById('btn-cancel');
const btnGeneratePassword = document.getElementById('generate-password-btn');
const nameError = document.getElementById('name-error');
const userError = document.getElementById('user-error');
const passwordError = document.getElementById('password-error');
const btnTogglePassword = document.getElementById('toggle-password-btn');
const togglePasswordIcon = document.getElementById('toggle-password-icon');


btnCancel.addEventListener('click', () => {
  window.location.href = 'index.html';
});

btnGeneratePassword.addEventListener('click', () => {
  passwordInput.value = generatePassword();
  validateField(passwordInput, passwordError, 8, 'The password must be at least 8 characters long.')
});

btnTogglePassword.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';

  passwordInput.type = isHidden ? 'text' : 'password';

  togglePasswordIcon.src = isHidden ? './assets/eye-disable.svg' : './assets/eye.svg';
  togglePasswordIcon.alt = isHidden ? 'Hide Password' : 'Show Password';
});

function generatePassword() {
  const length = 8;
  
  const numbers = '0123456789';
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const symbols = '.,;-_!¡?¿()@#$%&*';

  const allChars = numbers + lowerChars + upperChars + symbols;
  
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  return password;
}

siteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = nameInput.value.trim();
  const url = urlInput.value.trim();
  const user = userInput.value.trim();
  const password = passwordInput.value.trim();
  const description = descriptionInput.value.trim();

  const isNameValid = validateField(nameInput, nameError, 3, 'The name must be at least 3 characters long.');
  const isUserValid = validateField(userInput, userError, 3, 'The user must be at least 3 characters long.');
  const isPassValid = validateField(passwordInput, passwordError, 8, 'The password must be at least 3 characters long.');

  if (!isNameValid || !isUserValid || !isPassValid) return;

  const newSite = {
    name, 
    url,
    user, 
    password,
    description
  };

  try {
    const created = await apiService.createSite(categoryId, newSite);
    if (created) {
      window.location.href = 'index.html';
    }
  } catch (error) {
    console.error(`Error al crear el site: ${error}`);
  }
})

function validateField(input, errorEl, minLength, message) {
  const value = input.value.trim();

  if (value.length < minLength) {
    input.classList.add('input-error');
    errorEl.textContent = message;
    return false;
  }

  input.classList.remove('input-error');
  errorEl.textContent = '';
  return true;
}

nameInput.addEventListener('blur', () => {
  validateField(nameInput, nameError, 3, 'The name must be at least 3 characters long.');
});

userInput.addEventListener('blur', () => {
  validateField(userInput, userError, 3, 'The user must be at least 3 characters long.');
});

passwordError.addEventListener('blur', () => {
  validateField(passwordInput, passwordError, 8, 'The password must be at least 3 characters long.');
});