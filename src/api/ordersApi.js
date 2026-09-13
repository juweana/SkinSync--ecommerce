import axios from "axios";

// const API_URL = "http://127.0.0.1:8000/api/v1/orders/";

const API_URL = `${process.env.REACT_APP_API_URL}/orders/`;

export async function createOrder(orderData) {
  const response = await axios.post(API_URL, orderData);
  return response.data;
}
