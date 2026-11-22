export default class Api {
  
  constructor(url = 'http://localhost:3000') {
    this.url = url;
  }

  async getAllCategories() {
    const result = await fetch(`${this.url}/categories`);
    if (!result.ok) return [];
    return result.json();
  }

  async deleteCategory(id) {
    const result = await fetch(`${this.url}/categories/${id}`, {
      method: 'DELETE'
    });
    return result.ok;
  }
}