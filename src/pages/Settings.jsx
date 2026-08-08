import { useState } from "react";
import { Trash2 } from "lucide-react";
import { CATEGORIES } from "../utils/helpers";

// Settings page - pretty simple compared to the other pages.
// Shows a fake profile card, a currency preference (not actually wired up
// to anything, just for looks since I ran out of time to make it work
// everywhere), the list of categories, and a "clear all data" button.

function Settings({ onClearData }) {
  // this is just local UI state, doesn't actually change currency anywhere else
  // in the app - I know that's not ideal but the assignment was more focused
  // on the custom hooks part, so I kept this page simple
  const [currency, setCurrency] = useState("USD ($)");

  const handleClear = () => {
    // window.confirm shows a little browser popup asking "are you sure?"
    const confirmed = window.confirm(
      "This will delete ALL your saved expenses. Are you sure?"
    );
    if (confirmed) {
      onClearData();
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-bold text-gray-800 mb-1">Settings</h1>
      <p className="text-sm text-gray-500 mb-6">
        Manage your account and preferences.
      </p>

      {/* profile card */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-lg">
          A
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">Alex Rivers</p>
          <p className="text-xs text-gray-500">Pro Account</p>
        </div>
      </div>

      {/* preferences card */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Preferences
        </h2>
        <label className="text-xs text-gray-500">Currency</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
        >
          <option>USD ($)</option>
          <option>EUR (€)</option>
          <option>GBP (£)</option>
          <option>INR (₹)</option>
        </select>
        {/* small note so it's honest about not being fully functional yet */}
        <p className="text-[11px] text-gray-400 mt-1">
          (Note: switching currency here doesn't convert amounts yet - just a
          placeholder for now.)
        </p>
      </div>

      {/* categories card - just a read-only list */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Categories
        </h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <span
              key={cat.name}
              className={`px-3 py-1 rounded-full text-xs font-medium ${cat.color}`}
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      {/* danger zone */}
      <div className="bg-white rounded-xl shadow p-4 border border-red-100">
        <h2 className="text-sm font-semibold text-red-500 mb-1">
          Danger Zone
        </h2>
        <p className="text-xs text-gray-500 mb-3">
          This permanently deletes every expense saved in this browser.
        </p>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 text-sm text-red-600 border border-red-200 hover:bg-red-50 px-3 py-2 rounded-md"
        >
          <Trash2 size={14} />
          Clear All Data
        </button>
      </div>
    </div>
  );
}

export default Settings;
