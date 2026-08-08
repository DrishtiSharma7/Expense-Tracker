import { useMemo } from "react";

// This hook takes the full expenses list + the current filters
// and gives back only the expenses that match.
//
// I used useMemo here because I learned that recalculating the filtered
// list on EVERY render (even when nothing changed) is a bit wasteful.
// useMemo just remembers the result unless expenses/filters actually change.

function useFilteredExpenses(expenses, { searchTerm, category, sortBy }) {
  const filteredExpenses = useMemo(() => {
    let result = [...expenses];

    // 1. filter by search text (checks the title field)
    if (searchTerm) {
      result = result.filter((expense) =>
        expense.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. filter by category chip (if "All" then skip this filter)
    if (category && category !== "All") {
      result = result.filter((expense) => expense.category === category);
    }

    // 3. sort the results
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
