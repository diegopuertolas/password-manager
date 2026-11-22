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
const formError = document.getElementById('form-error');
const btnCancel = document.getElementById('btn-cancel');
const btnGeneratePassword = document.getElementById('generate-password-btn');

btnCancel.addEventListener('click', () => {
  window.location.href = 'index.html';
});

btnGeneratePassword.addEventListener('click', () => {
  passwordInput.value = generatePassword();
})

siteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = nameInput.value.trim();
  const url = urlInput.value.trim();
  const user = userInput.value.trim();
  const password = passwordInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!name || !user || !password) {
    formError.textContent = 'Name, user and password are required.';
    return;
  }

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