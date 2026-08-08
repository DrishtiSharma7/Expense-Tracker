import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { formatCurrency, getCategoryTotals, getSpendingOverTime, CATEGORY_BUDGETS } from "../utils/helpers";

const PIE_COLORS = [
  "#6366f1", // indigo
  "#f97316", // orange
  "#a855f7", // purple
  "#ec4899", // pink
  "#eab308", // yellow
  "#22c55e", // green
  "#6b7280", // gray
];

function Reports({ expenses }) {
  const categoryTotals = getCategoryTotals(expenses);
  const overTimeData = getSpendingOverTime(expenses);

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-8">
        Spending Reports
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Expenses Over Time
          </h2>
          {overTimeData.length === 0 ? (
            <p className="text-sm text-gray-400 py-16 text-center">
              Add some expenses to see this chart.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={overTimeData}>
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Category Split
          </h2>
          {categoryTotals.length === 0 ? (
            <p className="text-sm text-gray-400 py-16 text-center">
              No data yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={categoryTotals}
                  dataKey="total"
                  nameKey="category"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {categoryTotals.map((entry, index) => (
                    <Cell
                      key={entry.category}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Monthly Summary
        </h2>

        {categoryTotals.length === 0 ? (
          <p className="text-sm text-gray-400 py-6 text-center">
            Nothing to summarize yet.
          </p>
        ) : (
          <div>
            <div className="grid grid-cols-4 text-xs text-gray-400 pb-2 border-b border-gray-100">
              <span>Category</span>
              <span>Spent</span>
              <span>Budget</span>
              <span>Progress</span>
            </div>

            {categoryTotals.map((item) => {
              const budget = CATEGORY_BUDGETS[item.category] || 500;
              const percent = Math.min((item.total / budget) * 100, 100);
              const isOverBudget = item.total > budget;
              return (
                <div
                  key={item.category}
                  className="grid grid-cols-4 items-center text-sm py-3 border-b border-gray-50 last:border-none"
                >
                  <span className="text-gray-700">{item.category}</span>
                  <span className="text-gray-800">
                    {formatCurrency(item.total)}
                  </span>
                  <span className="text-gray-500">
                    {formatCurrency(budget)}
                  </span>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        isOverBudget ? "bg-red-500" : "bg-green-500"
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;
