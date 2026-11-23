import Api from './api.js';

const apiService = new Api();

const ul = document.getElementById('categories-list');
const btnAddCategory = document.getElementById('btn-add-category');
const categoryDialog = document.getElementById('category-dialog');
const btnCancelCategory = document.getElementById('btn-cancel-category');
const categoryForm = document.getElementById('category-form');
const categoryNameInput = document.getElementById('category-name');
const categoryError = document.getElementById('category-error');
const sitesList = document.getElementById('sites-list');
const btnAddSite = document.getElementById('btn-add-site');
const categoryIconSelect = document.getElementById('category-icon');

let selectedCategoryId = null;

async function renderCategories() {
  try {
    const categories = await apiService.getAllCategories();

    ul.innerHTML = '';
    
    categories.forEach(category => {
      
      const li = document.createElement('li');
      li.className = 'category';
      
      const icon = category.icon || '📁';

      li.innerHTML = `
        <div class="category-container">
          <div class="category-container__info">
            <span>${icon}</span>
            <span>${category.name}</span>
          </div>  
          <button class="bin-icon">
            <img src="../assets/bin-icon.svg" alt="Icono de borrar site" class="action-btn btn-delete" width="17px" height="17px">
          </button>  
        </div>
      `;

      li.addEventListener('click', () => {
        selectedCategoryId = category.id;
        renderSites(category.id);
      })
      
      const deleteBtn = li.querySelector('.bin-icon');
      deleteBtn.addEventListener('click', () => handleDeleteCategory(category.id));

      ul.appendChild(li);
    });
  } catch (error) {
    console.error(`Error al cargar las categorias: ${error}`);
  }
}

async function handleDeleteCategory(id) {
  try {
    const deleted = await apiService.deleteCategory(id);
    if (deleted) renderCategories();
  } catch (error) {
    console.error(`Error al eliminar la categoría: ${error}`)
  }
}

btnAddCategory.addEventListener('click', () => {
  categoryNameInput.classList.remove('input-error');
  categoryDialog.showModal();
});

btnAddSite.addEventListener('click', () => {
  if (!selectedCategoryId) {
    alert('Please, select a category if you want to create a site.')
    return;
  }
  window.location.href = `add-site.html?categoryId=${selectedCategoryId}`;

})

btnCancelCategory.addEventListener('click', () => {
  categoryDialog.close();
});

categoryForm.addEventListener('submit', async () => {
  
  const name = categoryNameInput.value.trim();
  const icon = categoryIconSelect.value;

  if (!validateCategoryName()) return;
  
  try {
    const created = apiService.createCategory(name, icon);
    if (created) {
      categoryDialog.close();
      renderCategories();
    }
  } catch (error) {
    console.error(`Error al crear la categoría: ${error}`);
  }      
})

async function renderSites(categoryId) {
  try {
    const data = await apiService.getSites(categoryId);
    const sites = data.sites;

    sitesList.innerHTML = '';

    if (sites.length === 0) {
      sitesList.innerHTML = `
        <tr>
          <td colspan="4" class="empty-table" >No sites available</td>
        </tr>
      `;
      return;
    }

    sites.forEach(site => {
      const tr = document.createElement('tr');

      const date = new Date(site.createdAt).toLocaleDateString('es-ES');
      
      tr.innerHTML = `
        <td>${site.name}</td>
        <td>${site.user}</td>
        <td>${date}</td>
        <td class="actions-cell">
          <img src="../assets/web-icon.svg" alt="Icono de ir a la web" class="action-btn btn-open">
          <img src="../assets/bin-icon.svg" alt="Icono de borrar site" class="action-btn btn-delete">
          <img src="../assets/edit-icon.svg" alt="Icono de editar site" class="action-btn btn-edit">
        </td>      
      `;

      const openUrlBtn = tr.querySelector('.btn-open');
      openUrlBtn.addEventListener('click', () => {
        if (site.url) {
          window.open(site.url, '_blank')
        }
      });

      const deleteBtn = tr.querySelector('.btn-delete');
      deleteBtn.addEventListener('click', () => handleDeleteSite(site.id));

      sitesList.appendChild(tr);
    });

  } catch (error) {
    console.error(`Error al cargar los sites: ${error}`)
  }
}

async function handleDeleteSite(id) {
  try {
    const deleted = await apiService.deleteSite(id);
    if (deleted) renderSites(selectedCategoryId);
  } catch (erorr) {
    console.error(`Error al borrar el site: ${site}`)
  }
}

function validateCategoryName() {
  const name = categoryNameInput.value.trim();

  if (name.length < 3) {
    categoryNameInput.classList.add('input-error');
    categoryError.textContent = 'The name must be at least 3 characters long.';
    return false;
  }

  categoryNameInput.classList.remove('input-error');
  categoryError.textContent = '';
  return true;
}

categoryNameInput.addEventListener('blur', validateCategoryName);

renderCategories();