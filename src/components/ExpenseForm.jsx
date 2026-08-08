import { useEffect } from "react";
import useForm from "../hooks/useForm";
import { CATEGORIES } from "../utils/helpers";

function ExpenseForm({ addExpense, updateExpense, editingExpense, onDone }) {
  const { values, handleChange, resetForm, setValues } = useForm({
    title: "",
    amount: "",
    category: "Food & Dining",
    date: new Date().toISOString().split("T")[0],
    isRecurring: false,
  });

  useEffect(() => {
    if (editingExpense) {
      setValues(editingExpense);
    } else {
      resetForm();
    }
  }, [editingExpense]);

  const toggleRecurring = () => {
    setValues((prev) => ({ ...prev, isRecurring: !prev.isRecurring }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.title.trim() || !values.amount) {
      alert("Please fill in the title and amount!");
      return;
    }
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(values.title.trim())) {
      alert("Title can contain only letters and spaces.");
      return;
    }
    if (editingExpense) {
      updateExpense(editingExpense.id, values);
    } else {
      addExpense(values);
    }
    resetForm();
    if (onDone) {
      onDone();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 text-center">
        <label className="text-xs text-gray-400 block mb-1">₹</label>
        <input
          type="number"
          name="amount"
          step="0.01"
          value={values.amount}
          onChange={handleChange}
          placeholder="0.00"
          className="w-full text-center text-3xl font-semibold outline-none text-gray-800"
        />
      </div>

      <div className="mb-3">
        <label className="text-xs text-gray-500">Title / Description</label>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="e.g., Groceries at Whole Foods"
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-xs text-gray-500">Category</label>
          <select
            name="category"
            value={values.category}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-500">Date</label>
          <input
            type="date"
            name="date"
            value={values.date}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      </div>

      <div className="flex items-center justify-between bg-gray-50 rounded-md px-3 py-2 mb-5">
        <div>
          <p className="text-sm text-gray-700">Recurring Expense</p>
          <p className="text-xs text-gray-400">
            Automatically add this periodically
          </p>
        </div>
        <button
          type="button"
          onClick={toggleRecurring}
          className={`relative flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ${
            values.isRecurring ? "bg-indigo-600" : "bg-gray-300"
          }`}>
          <span
            className={`block h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
              values.isRecurring ? "translate-x-5" : "translate-x-0"
            }`}/>
        </button>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onDone}
          className="flex-1 border border-gray-300 text-gray-600 text-sm font-medium py-2 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-md transition"
        >
          {editingExpense ? "Update Transaction" : "Save Transaction"}
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;
