import axios from "axios";

// const API_URL ="http://127.0.0.1:8000/api/v1/products/";
// const CATEGORIES_URL = "http://127.0.0.1:8000/api/v1/categories/"

const API_URL = `${process.env.REACT_APP_API_URL}/products/`;
const CATEGORIES_URL = `${process.env.REACT_APP_API_URL}/categories/`;

export async function getProducts(search, ordering, category) {
  const response = await axios.get(API_URL, {
    params: {
      search: search,
      ordering: ordering,
      category: category,
    },
  });

  return response.data.results;
}

export async function getProduct(id) {
  const response = await axios.get(`${API_URL}${id}/`);
  return response.data;
}

// Helper to fetch category list for dropdown

export async function getCategories() {
  const response = await axios.get(CATEGORIES_URL);
  return response.data.results || response.data;
}
