import axios from "axios";

const BASE_URL = "https://65a1c3d4e773a3b7ad9f1234.mockapi.io/api/v1";

export async function fetchExpensesFromApi() {
  try {
    const response = await axios.get(`${BASE_URL}/expenses`);
    return response.data;
  } catch (error) {
    console.log("Could not fetch from mockapi:", error.message);
    return [];
  }
}
export async function addExpenseToApi(expense) {
  try {
    const response = await axios.post(`${BASE_URL}/expenses`, expense);
    return response.data;
  } catch (error) {
    console.log("Could not save to mockapi:", error.message);
    return null;
  }
}
