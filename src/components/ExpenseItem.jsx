import { Trash2, ShoppingBag, Home, Car, Film, DollarSign, Tag, Edit, Shell } from "lucide-react";
import { formatCurrency, formatDate, getCategoryColor } from "../utils/helpers";

const CATEGORY_ICONS = {
  "Food & Dining": ShoppingBag,
  "Housing & Rent": Home,
  "Transportation": Car,
  "Entertainment": Film,
  "Income": DollarSign,
  "Other": Shell,
};

function ExpenseItem({ expense, onDelete, onEdit }) {
  const Icon = CATEGORY_ICONS[expense.category] || Tag;
  const isIncome = expense.category === "Income";

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-none">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${getCategoryColor(expense.category)}`}>
          <Icon size={16} />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-800">{expense.title}</p>
          <p className="text-xs text-gray-400">{formatDate(expense.date)}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className={`hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${getCategoryColor(expense.category)}`}>
          {expense.category}
        </span>
        <span
          className={`text-sm font-semibold ${
            isIncome ? "text-green-600" : "text-red-500"
          }`}
        >
          {isIncome ? "+" : "-"}
          {formatCurrency(expense.amount)}
        </span>
        <button
          onClick={() => onDelete(expense.id)}
          className="text-gray-400 hover:text-red-500 transition"
          title="Delete expense"
        >
          <Trash2 size={16} />
        </button>
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
