import { Plus, ShoppingBag, Home, Car, Film, DollarSign, Tag, Shell } from "lucide-react";
import Summary from "../components/Summary";
import { formatCurrency, formatDate, getCategoryTotals, getCategoryColor } from "../utils/helpers";

const CATEGORY_ICONS = {
  "Food & Dining": ShoppingBag,
  "Housing & Rent": Home,
  "Transportation": Car,
  "Entertainment": Film,
  "Income": DollarSign,
  "Other": Shell,
};

function Dashboard({ expenses, onOpenAddModal, goToTransactions }) {
  const recentExpenses = expenses.slice(0, 5);
  const categoryTotals = getCategoryTotals(expenses);
  const maxTotal = Math.max(...categoryTotals.map((c) => c.total), 1);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Overview</h1>
          <p className="text-sm text-gray-500">
            Here's your financial summary for this month.
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

      <div className="mt-6">
        <Summary expenses={expenses} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-700">
              Recent Transactions
            </h2>
            <button
              onClick={goToTransactions}
              className="text-xs text-indigo-600 hover:underline"
            >
              View All
            </button>
          </div>

          {recentExpenses.length === 0 ? (
            <p className="text-sm text-gray-400 py-6 text-center">
              No transactions yet. Add your first expense!
            </p>
          ) : (
            recentExpenses.map((expense) => {
              const Icon = CATEGORY_ICONS[expense.category] || Tag;
              const isIncome = expense.category === "Income";
              return (
                <div
                  key={expense.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-none"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${getCategoryColor(
                        expense.category
                      )}`}
                    >
                      <Icon size={14} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800 leading-tight">
                        {expense.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {expense.category} &middot; {formatDate(expense.date)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      isIncome ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {isIncome ? "+" : "-"}
                    {formatCurrency(expense.amount)}
                  </span>
                </div>
              );
            })
          )}
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Spending by Category
          </h2>
          {categoryTotals.length === 0 ? (
            <p className="text-sm text-gray-400 py-6 text-center">
              Nothing to show yet.
            </p>
          ) : (
            categoryTotals.map((item) => (
              <div key={item.category} className="mb-3 last:mb-0">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>{item.category}</span>
                  <span>{formatCurrency(item.total)}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: `${(item.total / maxTotal) * 100}%` }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
