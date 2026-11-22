export default class Api {
  
  constructor(url = 'http://localhost:3000') {
    this.url = url;
  }

  async getAllCategories() {
    const result = await fetch(`${this.url}/categories`);
    if (!result.ok) return [];
    return result.json();
  }

  async createCategory(name) {
    const result = await fetch(`${this.url}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });

    return result.ok;
  }

  async deleteCategory(id) {
    const result = await fetch(`${this.url}/categories/${id}`, {
      method: 'DELETE'
    });
    return result.ok;
  }

  async getSites(id) {
    const result = await fetch(`${this.url}/categories/${id}`);
    if (!result.ok) return [];
    return result.json();
  }
}