import { Search } from "lucide-react";
import Chip from "./Chip";
import { CATEGORIES } from "../utils/helpers";

// This component just holds the search box, the category chips and the
// sort-by dropdown. It doesn't hold any state itself - all the state lives
// in App.jsx and gets passed down as props (I learned this is called
// "lifting state up").

function Filters({ searchTerm, setSearchTerm, category, setCategory, sortBy, setSortBy }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      {/* search input */}
      <div className="relative mb-3">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={16}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search expenses..."
          className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* category chips - "All" chip plus one chip per category */}
      <div className="flex flex-wrap gap-2 mb-3">
        <Chip
          label="All"
          colorClasses="bg-gray-100 text-gray-700"
          isActive={category === "All"}
          onClick={() => setCategory("All")}
        />
        {CATEGORIES.map((cat) => (
          <Chip
            key={cat.name}
            label={cat.name}
            colorClasses={cat.color}
            isActive={category === cat.name}
            onClick={() => setCategory(cat.name)}
          />
        ))}
      </div>

      {/* sort dropdown */}
      <div className="flex items-center gap-2">
        <label className="text-xs text-gray-500">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm outline-none"
        >
          <option value="date">Date (Newest)</option>
          <option value="amount">Amount (Highest)</option>
          <option value="category">Category (A-Z)</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
