import ExpenseItem from "./ExpenseItem";
import { Inbox } from "lucide-react";

function ExpenseList({ expenses, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-sm font-semibold text-gray-700 mb-2">
        Transactions ({expenses.length})
      </h2>

      {expenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-400 py-10">
          <Inbox size={32} className="mb-2" />
          <p className="text-sm">No expenses found.</p>
        </div>
      ) : (
        <div>
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
