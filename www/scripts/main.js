import Api from './api.js'

const apiService = new Api();

const ul = document.getElementById('categories-list');
const btnAddCategory = document.getElementById('btn-add-category');
const categoryDialog = document.getElementById('category-dialog');
const btnCancelCategory = document.getElementById('btn-cancel-category');
const categoryForm = document.getElementById('category-form');
const categoryNameInput = document.getElementById('category-name');
const categoryError = document.getElementById('category-error');
const sitesList = document.getElementById('sites-list');

async function renderCategories() {
  try {
    const categories = await apiService.getAllCategories();

    ul.innerHTML = '';
    
    categories.forEach(category => {
      
      const li = document.createElement('li');
      li.className = 'category';
      
      li.innerHTML = `
        <div class="category-container">
          <span>${category.name}</span>
          <button class="bin-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash preview-icon"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>  
        </div>
      `;

      li.addEventListener('click', () => {
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
  categoryDialog.showModal();
});

btnCancelCategory.addEventListener('click', () => {
  categoryDialog.close();
});

categoryForm.addEventListener('submit', async () => {
  
  const name = categoryNameInput.value.trim();

  if (!name) {
    categoryError.textContent = 'El nombre es obligatorio';
    return;
  }

  try {
    const created = apiService.createCategory(name);
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
      
      tr.innerHTML = `
        <td>${site.name}</td>
        <td>${site.user}</td>
        <td>${site.createdAt}</td>
        <td class="actions-cell">
          <button class="action-btn btn-open"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe-ban preview-icon"><path d="M12 22a14.48 14.48 0 01-4.008-10C7.993 9.136 9 5.258 11 2.05A10 10 0 0012 22"/><path d="m15.172 3.172 5.656 5.656"/><path d="M15.86 14a14.5 14.5 0 01-3.859 8 10 10 0 009.949-9"/><path d="M2 12h10.5"/><circle cx="18" cy="6" r="4"/></svg></button>
          <button class="action-btn btn-delete"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash preview-icon"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
          <button class="action-btn btn-edit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen-line preview-icon"><path d="M13 21h8"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg></button>
        </td>      
      `;

      const openUrlBtn = tr.querySelector('.btn-open');
      openUrlBtn.addEventListener('click', () => {
        if (site.url) {
          window.open(site.url, '_blank')
        }
      })

      sitesList.appendChild(tr);
    });

  } catch (error) {
    console.error(`Error al cargar los sites: ${error}`)
  }
}

renderCategories();