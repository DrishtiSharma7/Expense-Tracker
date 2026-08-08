import axios from "axios";

// I used https://mockapi.io to create a fake backend for this project since
// we don't have a real server. I made a resource called "expenses" there.
//
// IMPORTANT: replace this URL with YOUR OWN mockapi.io project url.
// Steps: go to mockapi.io -> sign in -> New Project -> add a resource
// called "expenses" with fields: title (string), amount (number),
// category (string), date (string) -> copy your endpoint url and paste below.
const BASE_URL = "https://65a1c3d4e773a3b7ad9f1234.mockapi.io/api/v1";

// gets the starter/demo expenses from mockapi
// I only call this ONE time when the app first loads (see App.jsx useEffect)
// and only if localStorage is empty, so we have some sample data to show.
export async function fetchExpensesFromApi() {
  try {
    const response = await axios.get(`${BASE_URL}/expenses`);
    return response.data;
  } catch (error) {
    // if mockapi is down or the url is wrong, we don't want to crash the app
    // so I just log the error and return an empty array instead
    console.log("Could not fetch from mockapi:", error.message);
    return [];
  }
}

// this one is optional - it can also POST a new expense to mockapi
// so the "backend" stays in sync too (not required, but nice to have)
export async function addExpenseToApi(expense) {
  try {
    const response = await axios.post(`${BASE_URL}/expenses`, expense);
    return response.data;
  } catch (error) {
    console.log("Could not save to mockapi:", error.message);
    return null;
  }
}
