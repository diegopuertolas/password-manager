import Api from './api.js'

const apiService = new Api();

const ul = document.getElementById('categories-list');

async function renderCategories() {
  try {
    const categories = await apiService.getAllCategories();
        
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

renderCategories();