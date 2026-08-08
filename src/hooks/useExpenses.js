import useLocalStorage from "./useLocalStorage";
import { generateId } from "../utils/helpers";

// This hook is basically the "brain" of the app.
// It keeps the list of expenses (saved in localStorage using our other hook)
// and gives back functions to add, edit, delete and update expenses.

function useExpenses() {
  // "expenses" starts as an empty array if nothing is saved yet
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  // Adds a new expense
  const addExpense = (expense) => {
  const newExpense = {
    id: generateId(),
    ...expense,
  };

  setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);

  alert("Expense added successfully!");
};

  // Deletes an expense
  const deleteExpense = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this expense?",
    );

    if (!shouldDelete) return;

    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id),
    );
  };

  // Edit an existing expense
  const editExpense = (updatedExpense) => {
    const shouldEdit = window.confirm(
      "Are you sure you want to update this expense?",
    );

    if (!shouldEdit) return;

    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense,
      ),
    );

    alert("Expense updated successfully!");
  };

  // Update an existing expense with specific fields
const updateExpense = (id, updatedFields) => {
  const shouldEdit = window.confirm(
    "Are you sure you want to update this expense?"
  );

  if (!shouldEdit) return;

  setExpenses((prevExpenses) =>
    prevExpenses.map((expense) =>
      expense.id === id
        ? { ...expense, ...updatedFields }
        : expense
    )
  );

  alert("Expense updated successfully!");
};

  // Calculates the balance
  const getTotal = () => {
    return expenses.reduce((total, expense) => {
      const amount = Number(expense.amount) || 0;

      if (expense.category === "Income") {
        return total + amount;
      }

      return total - amount;
    }, 0);
  };

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getTotal,
    setExpenses,
  };
}

export default useExpenses;
