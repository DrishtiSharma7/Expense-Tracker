export const CATEGORIES = [
  { name: "Food & Dining", color: "bg-orange-100 text-orange-700" },
  { name: "Housing & Rent", color: "bg-blue-100 text-blue-700" },
  { name: "Transportation", color: "bg-purple-100 text-purple-700" },
  { name: "Entertainment", color: "bg-pink-100 text-pink-700" },
  { name: "Shopping", color: "bg-yellow-100 text-yellow-700" },
  { name: "Income", color: "bg-green-100 text-green-700" },
  { name: "Other", color: "bg-gray-200 text-gray-700" },
];

export function getCategoryColor(categoryName) {
  const found = CATEGORIES.find((cat) => cat.name === categoryName);
  return found ? found.color : "bg-gray-100 text-gray-700";
}

export function formatCurrency(amount) {
  const num = Number(amount) || 0;
  return "₹" + num.toFixed(2);
}

export function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const CATEGORY_BUDGETS = {
  "Housing & Rent": 25000,
  "Food & Dining": 20000,
  "Transportation": 6000,
  "Entertainment": 2000,
  "Shopping": 5000,
  "Other": 1000,
};

export function getCategoryTotals(expenses) {
  const totals = {};
  expenses.forEach((expense) => {
    if (expense.category === "Income") return; 
    const amount = Number(expense.amount) || 0;
    if (!totals[expense.category]) {
      totals[expense.category] = 0;
    }
    totals[expense.category] += amount;
  });
  return Object.keys(totals).map((category) => ({
    category,
    total: totals[category],
  }));
}

export function getSpendingOverTime(expenses) {
  const totals = {};

  expenses
    .filter((exp) => exp.category !== "Income")
    .forEach((expense) => {
      const label = formatDate(expense.date);
      if (!totals[label]) totals[label] = 0;
      totals[label] += Number(expense.amount) || 0;
    });
  return Object.keys(totals)
    .map((label) => ({ date: label, total: totals[label] }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function generateId() {
  return Date.now().toString() + Math.floor(Math.random() * 1000);
}
