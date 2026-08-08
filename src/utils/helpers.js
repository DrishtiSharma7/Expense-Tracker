// I am keeping all the small helper functions here so I don't repeat
// the same code again and again in different components (my teacher told
// me this is called "DRY" - Don't Repeat Yourself)

// list of categories used in the whole app
// every category also has a color, I use this color for the little "chip" badge
export const CATEGORIES = [
  { name: "Food & Dining", color: "bg-orange-100 text-orange-700" },
  { name: "Housing & Rent", color: "bg-blue-100 text-blue-700" },
  { name: "Transportation", color: "bg-purple-100 text-purple-700" },
  { name: "Entertainment", color: "bg-pink-100 text-pink-700" },
  { name: "Shopping", color: "bg-yellow-100 text-yellow-700" },
  { name: "Income", color: "bg-green-100 text-green-700" },
  { name: "Other", color: "bg-gray-100 text-gray-700" },
];

// this just finds the color for a given category name
// if I don't find it, I just return a default gray color so nothing breaks
export function getCategoryColor(categoryName) {
  const found = CATEGORIES.find((cat) => cat.name === categoryName);
  return found ? found.color : "bg-gray-100 text-gray-700";
}

// simple function to turn a number into money format like $123.45
export function formatCurrency(amount) {
  // Number() just in case amount comes as a string from an input field
  const num = Number(amount) || 0;
  return "$" + num.toFixed(2);
}

// converts date string into something more readable like "Oct 24, 2023"
export function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  // if the date is invalid just return the original string, better than crashing
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// rough monthly "budget" for each category - just hardcoded numbers so the
// Reports page has something to compare "spent" against, like in the design.
// in a real app this would probably come from user settings / a database
export const CATEGORY_BUDGETS = {
  "Housing & Rent": 2000,
  "Food & Dining": 1200,
  Transportation: 750,
  Entertainment: 300,
  Shopping: 400,
  Other: 500,
};

// adds up all the expenses grouped by category
// returns something like: [{ category: "Food & Dining", total: 84.5 }, ...]
// (skips "Income" since that's money coming IN, not spending)
export function getCategoryTotals(expenses) {
  const totals = {};

  expenses.forEach((expense) => {
    if (expense.category === "Income") return; // skip income
    const amount = Number(expense.amount) || 0;
    if (!totals[expense.category]) {
      totals[expense.category] = 0;
    }
    totals[expense.category] += amount;
  });

  // turn the {category: total} object into an array so it's easier to .map() over
  return Object.keys(totals).map((category) => ({
    category,
    total: totals[category],
  }));
}

// groups expenses by date and sums them up, used for the "expenses over time" chart
// returns something like: [{ date: "Oct 1", total: 45 }, { date: "Oct 3", total: 120 }]
export function getSpendingOverTime(expenses) {
  const totals = {};

  expenses
    .filter((exp) => exp.category !== "Income")
    .forEach((expense) => {
      const label = formatDate(expense.date);
      if (!totals[label]) totals[label] = 0;
      totals[label] += Number(expense.amount) || 0;
    });

  // convert to array and sort by actual date (not alphabetically!)
  return Object.keys(totals)
    .map((label) => ({ date: label, total: totals[label] }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

// small helper to make a random id for new expenses
// (not super fancy, just Date.now() + random number, but it works fine for this project)
export function generateId() {
  return Date.now().toString() + Math.floor(Math.random() * 1000);
}

