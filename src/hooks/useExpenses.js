import useLocalStorage from "./useLocalStorage";
import { generateId } from "../utils/helpers";

function useExpenses() {
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  const addExpense = (expense) => {
  const newExpense = {
    id: generateId(),
    ...expense,
  };
  setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
};

  const deleteExpense = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this expense?",
    );
    if (!shouldDelete) return;
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id),
    );
  };

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
  };
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
};

  const getTotal = () => {
    return expenses.reduce((total, expense) => {
      const amount = Number(expense.amount) || 0;
      if (expense.category === "Income") {
        return total + amount;
      }
      return total - amount;
    }, 0);
  };

  return {expenses, addExpense, updateExpense, deleteExpense, getTotal, setExpenses };
}

export default useExpenses;
