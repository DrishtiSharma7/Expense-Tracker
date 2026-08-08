import { useMemo } from "react";

function useFilteredExpenses(expenses, { searchTerm, category, sortBy }) {
  const filteredExpenses = useMemo(() => {
    let result = [...expenses];
    if (searchTerm) {
      result = result.filter((expense) =>
        expense.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (category && category !== "All") {
      result = result.filter((expense) => expense.category === category);
    }
    if (sortBy === "amount") {
      result.sort((a, b) => Number(b.amount) - Number(a.amount));
    } else if (sortBy === "date") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "category") {
      result.sort((a, b) => a.category.localeCompare(b.category));
    }
    return result;
  }, [expenses, searchTerm, category, sortBy]);
  return filteredExpenses;
}

export default useFilteredExpenses;
