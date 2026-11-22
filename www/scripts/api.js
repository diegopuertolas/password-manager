export default class Api {
  
  constructor(url = 'http://localhost:3000') {
    this.url = url;
  }

  async getAllCategories() {
    const result = await fetch(`${this.url}/categories`);
    if (!result.ok) return [];
    return result.json();
  }

  async createCategory(name, icon) {
    const result = await fetch(`${this.url}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, icon })
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

  async createSite(categoryId, site) {
    const result = await fetch(`${this.url}/categories/${categoryId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(site)
    });
    return result.ok;
  }

  async deleteSite(id) {
    const result = await fetch(`${this.url}/sites/${id}`, {
      method: 'DELETE'
    });
    return result.ok;
  }
}