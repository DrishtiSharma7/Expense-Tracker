# Personal Expense Tracker (Custom Hooks + LocalStorage)

A simple expense tracker I built with React + Tailwind CSS as part of my
custom hooks assignment (Module 10).

## What it does

The app now has 4 real pages you can switch between using the sidebar:

- **Dashboard** - balance/income/expense summary cards, a "recent
  transactions" preview, and a spending-by-category breakdown
- **Transactions** - the full expense history with search, category chips,
  and sorting
- **Reports** - a spending-over-time line chart, a category split donut
  chart, and a monthly budget-vs-spent table (built with `recharts`)
- **Settings** - profile card, a (placeholder) currency preference, the
  list of categories, and a "Clear All Data" button

Clicking "+ Add Expense" anywhere opens a popup (modal) with the add
transaction form, including a recurring-expense toggle.

- Everything is saved in the browser's localStorage, so it's still there
  after you refresh the page
- Loads some starter demo data from a mockapi.io endpoint the first time
  you open the app (only if you have no expenses saved yet)

## Tech used

- React 18 + Vite
- Tailwind CSS
- lucide-react (icons)
- axios (for the mockapi.io call)

## Folder structure

```
src/
  components/   -> ExpenseForm, ExpenseList, ExpenseItem, Filters, Summary, Sidebar, Chip, Modal
  pages/        -> Dashboard, Transactions, Reports, Settings
  hooks/        -> useLocalStorage, useForm, useExpenses, useFilteredExpenses
  services/     -> mockApi.js (axios calls to mockapi.io)
  utils/        -> helpers.js (formatting, category list, budgets, chart data helpers)
```

Note: I didn't use `react-router` for page navigation - the sidebar just
sets an `activeTab` value in `App.jsx`'s state, and `App.jsx` decides which
page component to render based on that. Simpler to follow for this
assignment, even if a real production app would probably use routing.

## Custom hooks (the main point of this project)

- `useLocalStorage(key, initialValue)` - a generic hook that works exactly
  like useState but also saves/loads the value from localStorage
- `useForm(initialValues)` - manages all the input fields of the add-expense
  form in one object instead of separate useState calls
- `useExpenses()` - all the add / delete / update logic for expenses, built
  on top of useLocalStorage
- `useFilteredExpenses(expenses, filters)` - handles search, category
  filtering and sorting, wrapped in useMemo

## How to run it locally

```
npm install
npm run dev
```

Then open the local URL it prints in your terminal (usually
http://localhost:5173).

## MockAPI setup (optional)

This project is set up to fetch some demo expenses from mockapi.io on
first load. If you want to use your own:

1. Go to https://mockapi.io and create a free project
2. Add a resource called `expenses` with fields: `title` (string), `amount`
   (number), `category` (string), `date` (string)
3. Copy your endpoint URL and paste it into `BASE_URL` inside
   `src/services/mockApi.js`

If mockapi is unreachable, the app still works fine - it just starts empty
and you can add expenses manually.

## Deployment

Can be deployed for free on Netlify or Vercel by connecting this repo and
setting the build command to `npm run build` and the output directory to
`dist`.
# Expense-Tracker
