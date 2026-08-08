import ExpenseItem from "./ExpenseItem";
import { Inbox } from "lucide-react";

// This component just loops through the expenses array and renders
// an <ExpenseItem /> for each one. If the array is empty, we show a
// simple "no expenses" message instead.

function ExpenseList({ expenses, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-sm font-semibold text-gray-700 mb-2">
        Transactions ({expenses.length})
      </h2>

      {expenses.length === 0 ? (
        // empty state - shown when there's nothing to display (e.g. filters
        // don't match anything, or user has no expenses yet)
        <div className="flex flex-col items-center justify-center text-gray-400 py-10">
          <Inbox size={32} className="mb-2" />
          <p className="text-sm">No expenses found.</p>
        </div>
      ) : (
        <div>
          {/* .map() to render one row per expense - remember the "key" prop! */}
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpenseList;
