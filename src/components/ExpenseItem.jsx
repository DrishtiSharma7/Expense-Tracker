import { Trash2, ShoppingBag, Home, Car, Film, DollarSign, Tag, Edit } from "lucide-react";
import { formatCurrency, formatDate, getCategoryColor } from "../utils/helpers";

// I made a little map of category -> icon, just so the list looks nicer
// with a small colored icon next to each expense (kind of like the design image)
const CATEGORY_ICONS = {
  "Food & Dining": ShoppingBag,
  "Housing & Rent": Home,
  Transportation: Car,
  Entertainment: Film,
  Income: DollarSign,
};

// This is ONE row in the expense list.
// It gets a single "expense" object and the "onDelete" function as props.
function ExpenseItem({ expense, onDelete, onEdit }) {
  // pick the right icon, or fall back to a generic Tag icon
  const Icon = CATEGORY_ICONS[expense.category] || Tag;

  // decide if this row should show + or - in front of the amount
  const isIncome = expense.category === "Income";

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-none">
      <div className="flex items-center gap-3">
        {/* small icon circle */}
        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${getCategoryColor(expense.category)}`}>
          <Icon size={16} />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-800">{expense.title}</p>
          <p className="text-xs text-gray-400">{formatDate(expense.date)}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* category chip */}
        <span className={`hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${getCategoryColor(expense.category)}`}>
          {expense.category}
        </span>

        {/* amount, green for income, red for expense */}
        <span
          className={`text-sm font-semibold ${
            isIncome ? "text-green-600" : "text-red-500"
          }`}
        >
          {isIncome ? "+" : "-"}
          {formatCurrency(expense.amount)}
        </span>

        {/* delete button */}
        <button
          onClick={() => onDelete(expense.id)}
          className="text-gray-400 hover:text-red-500 transition"
          title="Delete expense"
        >
          <Trash2 size={16} />
        </button>

        {/* edit button */}
        <button
          onClick={() => onEdit(expense)}
          className="text-gray-400 hover:text-indigo-500 transition"
          title="Edit expense"
        >
          <Edit size={16} />
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;
