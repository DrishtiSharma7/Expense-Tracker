import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency } from "../utils/helpers";

function Summary({ expenses }) {
  const totalIncome = expenses
    .filter((exp) => exp.category === "Income")
    .reduce((sum, exp) => sum + Number(exp.amount), 0);

  const totalExpense = expenses
    .filter((exp) => exp.category !== "Income")
    .reduce((sum, exp) => sum + Number(exp.amount), 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-xs text-gray-500 mb-1">Total Balance</p>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {formatCurrency(balance)}
          </h2>
          <Wallet className="text-indigo-500" size={22} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-xs text-gray-500 mb-1">This Month's Income</p>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-green-600">
            {formatCurrency(totalIncome)}
          </h2>
          <TrendingUp className="text-green-500" size={22} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-xs text-gray-500 mb-1">This Month's Expenses</p>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-red-500">
            {formatCurrency(totalExpense)}
          </h2>
          <TrendingDown className="text-red-500" size={22} />
        </div>
      </div>
    </div>
  );
}

export default Summary;
