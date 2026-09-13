import axios from "axios";

// const API_URL = "http://127.0.0.1:8000/api/v1/dashboard/counts/";

const API_URL = `${process.env.REACT_APP_API_URL}/dashboard/counts/`;

export async function getDashboardCounts() {
  const response = await axios.get(API_URL);
  return response.data;
}
