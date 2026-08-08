import { useState } from "react";
import { Plus } from "lucide-react";
import Filters from "../components/Filters";
import ExpenseList from "../components/ExpenseList";
import useFilteredExpenses from "../hooks/useFilteredExpenses";

function Transactions({ expenses, onDelete, onEdit, onOpenAddModal }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const filteredExpenses = useFilteredExpenses(expenses, { searchTerm, category, sortBy });
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Transaction History
          </h1>
          <p className="text-sm text-gray-500">
            Every expense and income you've logged.
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-3 py-2 rounded-md"
        >
          <Plus size={16} />
          Add Expense
        </button>
      </div>

      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <ExpenseList
        expenses={filteredExpenses}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
}

export default Transactions;
