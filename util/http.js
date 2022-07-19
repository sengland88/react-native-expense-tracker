import axios from "axios";

const firebaseUrl =
  "https://react-native-expense-tra-2b98e-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  const response = await axios.post(
    firebaseUrl + "/expenses.json",
    expenseData
  );

  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(firebaseUrl + "/expenses.json");

  const expenses = [];

  console.log(response.data);

  for (const key in response.data) {
    const expenseObject = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObject);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(firebaseUrl + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(firebaseUrl + `/expenses/${id}.json`);
}
